package com.backend.Dto;


import com.backend.database.User;

public class AuthResponse {

    public AuthResponse(){}

    private User user;
    private String token;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public AuthResponse(String token,User user) {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
