package com.backend.Services;


import com.backend.Dto.*;

public interface AuthenticationService {

    RegisterResponse register(RegisterRequest registerRequest);

    AuthResponse login(LoginRequest loginRequest);

    void resetPassword(ResetPasswordRequest resetPasswordRequest);
}
