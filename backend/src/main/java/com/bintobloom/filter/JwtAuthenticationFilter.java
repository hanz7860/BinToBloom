package com.bintobloom.filter;

import com.bintobloom.config.JwtConfig;
import com.bintobloom.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component; // Keep import for now, but remove annotation
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

// REMOVE @Component annotation from here
// @Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter implements Ordered {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtConfig jwtConfig;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain chain) throws ServletException, IOException {

        logger.info("--- JWT Filter: ENTERING doFilterInternal for URI: {} ---", request.getRequestURI());

        final String requestTokenHeader = request.getHeader("Authorization");
        final String requestURI = request.getRequestURI();

        logger.info("JWT Filter: Processing request for URI: {}", requestURI);
        logger.info("JWT Filter: Authorization Header: {}", requestTokenHeader != null ? "Present" : "Missing");

        String username = null;
        String jwtToken = null;
        String userType = null;

        // Skip JWT filter for authentication-related endpoints
        if (requestURI.startsWith("/api/auth/login") ||
            requestURI.startsWith("/api/auth/register") ||
            requestURI.startsWith("/api/auth/validate") ||
            requestURI.startsWith("/api/auth/refresh")) {
            logger.info("JWT Filter: Skipping for auth endpoint: {}", requestURI);
            chain.doFilter(request, response);
            logger.info("--- JWT Filter: EXITING doFilterInternal (skipped) for URI: {} ---", request.getRequestURI());
            return;
        }

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            logger.info("JWT Filter: Extracted JWT Token. Attempting to get username and userType...");
            try {
                username = jwtConfig.getUsernameFromToken(jwtToken);
                userType = jwtConfig.getUserTypeFromToken(jwtToken);
                logger.info("JWT Filter: Username from token: {}, UserType: {}", username, userType);
            } catch (Exception e) {
                logger.error("JWT Filter: Unable to get JWT Token or invalid token format: {}", e.getMessage());
            }
        } else {
            logger.warn("JWT Filter: Authorization header does not start with Bearer string or is null for URI: {}", requestURI);
        }

        // If username is found from token and no authentication is already set in the context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            logger.info("JWT Filter: Validating token for username: {}", username);
            if (jwtConfig.validateToken(jwtToken, username)) {
                // Create authorities based on userType
                List<SimpleGrantedAuthority> authorities = Collections.emptyList();
                if (userType != null) {
                    authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + userType.toUpperCase()));
                    logger.info("JWT Filter: Granted authorities: {}", authorities);
                }

                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(username, null, authorities);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.info("JWT Filter: Successfully authenticated user: {} with roles: {}", username, authorities);
            } else {
                logger.warn("JWT Filter: Token validation failed for username: {}", username);
            }
        } else if (SecurityContextHolder.getContext().getAuthentication() != null) {
            logger.info("JWT Filter: SecurityContext already has authentication for user: {}", SecurityContextHolder.getContext().getAuthentication().getName());
        } else {
            logger.info("JWT Filter: No username found from token or no authentication set for URI: {}", requestURI);
        }

        chain.doFilter(request, response);
        logger.info("--- JWT Filter: EXITING doFilterInternal for URI: {} ---", request.getRequestURI());
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
