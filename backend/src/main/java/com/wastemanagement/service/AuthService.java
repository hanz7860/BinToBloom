package com.wastemanagement.service;

import com.wastemanagement.dto.AuthResponse;
import com.wastemanagement.dto.LoginRequest;
import com.wastemanagement.dto.RegisterRequest;
import com.wastemanagement.dto.UserDto;
import com.wastemanagement.entity.User;
import com.wastemanagement.repository.UserRepository;
import com.wastemanagement.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setLocation(request.getLocation());

        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser);

        return new AuthResponse(token, new UserDto(savedUser));
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(userDetails);

        return new AuthResponse(token, new UserDto(user));
    }

    public AuthResponse verifyToken(String token) {
        if (!jwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid token");
        }

        String email = jwtUtil.extractUsername(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(token, new UserDto(user));
    }
}
