package com.bintobloom.controller;

import com.bintobloom.config.JwtConfig;
import com.bintobloom.dto.UserRegistrationDto;
import com.bintobloom.dto.LoginRequestDto;
import com.bintobloom.dto.LoginResponseDto;
import com.bintobloom.model.User;
import com.bintobloom.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://yourdomain.com"})
public class AuthController {
    
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequestDto loginRequest) {
        try {
            Optional<User> userOpt = userService.findByUsername(loginRequest.getUsername());
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(createErrorResponse("Invalid username or password"));
            }
            
            User user = userOpt.get();
            
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body(createErrorResponse("Invalid username or password"));
            }
            
            if (user.getStatus() != User.UserStatus.ACTIVE) {
                return ResponseEntity.badRequest().body(createErrorResponse("Account is not active"));
            }
            
            // Generate JWT token
            String token = jwtConfig.generateToken(user.getUsername(), user.getId(), user.getUserType().toString());
            
            LoginResponseDto response = LoginResponseDto.builder()
                .success(true)
                .message("Login successful")
                .token(token)
                .user(LoginResponseDto.UserInfo.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .userType(user.getUserType().toString())
                    .ecoPoints(user.getEcoPoints())
                    .totalWasteCollected(user.getTotalWasteCollected())
                    .build())
                .build();
                
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(createErrorResponse("Login failed: " + e.getMessage()));
        }
    }
    
    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body(createErrorResponse("Invalid token format"));
            }
            
            String token = authHeader.substring(7);
            String username = jwtConfig.getUsernameFromToken(token);
            Long userId = jwtConfig.getUserIdFromToken(token);
            
            if (!jwtConfig.validateToken(token, username)) {
                return ResponseEntity.badRequest().body(createErrorResponse("Invalid or expired token"));
            }
            
            Optional<User> userOpt = userService.findById(userId);
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(createErrorResponse("User not found"));
            }
            
            User user = userOpt.get();
            LoginResponseDto response = LoginResponseDto.builder()
                .success(true)
                .message("Token valid")
                .user(LoginResponseDto.UserInfo.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .userType(user.getUserType().toString())
                    .ecoPoints(user.getEcoPoints())
                    .totalWasteCollected(user.getTotalWasteCollected())
                    .build())
                .build();
                
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(createErrorResponse("Token validation failed"));
        }
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body(createErrorResponse("Invalid token format"));
            }
            
            String token = authHeader.substring(7);
            String username = jwtConfig.getUsernameFromToken(token);
            Long userId = jwtConfig.getUserIdFromToken(token);
            String userType = jwtConfig.getUserTypeFromToken(token);
            
            // Generate new token
            String newToken = jwtConfig.generateToken(username, userId, userType);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", newToken);
            response.put("message", "Token refreshed successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(createErrorResponse("Token refresh failed"));
        }
    }
    
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", message);
        return response;
    }
}
