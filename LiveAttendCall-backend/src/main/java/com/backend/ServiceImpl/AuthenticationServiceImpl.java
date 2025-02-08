package com.backend.ServiceImpl;

import com.backend.AuthConfig.JwtUtil;
import com.backend.Dto.*;
import com.backend.Mapper.UserMapper;
import com.backend.Repository.UserRepository;
import com.backend.database.Role;
import com.backend.database.User;
import com.backend.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        // No need to get UserMapper INSTANCE here; it's injected
        Optional<User> u = userRepository.findByEmail(registerRequest.getEmail());

        Optional<User> existingUser = userRepository.findByEmail(registerRequest.getEmail());

        if (existingUser.isPresent()) {
            // User with this email already exists.  Return a 400 Bad Request.
            RegisterResponse errorResponse = new RegisterResponse(); // Or use a dedicated error DTO
            errorResponse.setMessage("User with email " + registerRequest.getEmail() + " already exists");
            return errorResponse; // Return the error response directly.
        }


        String userType = registerRequest.getUserType();
        Role role = null;

        try {
            role = Role.valueOf(userType); // More robust way to get the enum
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid user type: " + userType); // Throw exception for invalid role
        }

        User user = new User();
        user.setUserRole(role);
        user.setActive(true);
        user.setEmail(registerRequest.getEmail());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        LocalDateTime localDateTime = LocalDateTime.now();
        user.setLastUpdated(localDateTime);
        user.setCreatedAt(localDateTime);
        user.setRegistrationDate(Instant.from(localDateTime));

        User savedUser = userRepository.save(user); // Save the user first
        return UserMapper.INSTANCE.userToResponse(savedUser); // Then map and return the response
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        AuthResponse authResponse = new AuthResponse();
        Optional<User> user = Optional.empty(); // Start with an empty Optional

         if (loginRequest.getEmail() != null && !loginRequest.getEmail().isEmpty()) { // Check for null AND empty
            user = userRepository.findByEmail(loginRequest.getEmail()); // Handle potential null from findByEmail
        }

        if (user.isEmpty()) { // Check if the Optional is empty
            throw new UsernameNotFoundException("User not found"); // Use a more specific exception type
        }

        User foundUser = user.get(); // Get the user from the Optional (now safe)

        if (!passwordEncoder.matches(loginRequest.getPassword(), foundUser.getPassword())) {
            throw new BadCredentialsException("Invalid credentials"); // Use a more specific exception type

        }
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtil.generateToken(foundUser.getEmail(),foundUser.getUserRole());

        authResponse.setUser(foundUser);
        authResponse.setToken(token);
        return authResponse;
    }

    @Override
    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {

    }
}
