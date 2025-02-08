package com.backend.Controller;

import com.backend.Dto.*;
import com.backend.ServiceImpl.AuthenticationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@ControllerAdvice
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationServiceImpl authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
        RegisterResponse response = authService.register(registerRequest);

        if (response.getMessage() != null) { // Check if there's an error message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); // Return 400 with error
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 Created on success
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + response.getToken());
        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok("Password reset successfully!");
    }
}