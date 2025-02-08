package com.backend.AuthConfig;

import com.backend.database.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil  {

    private final String SECRET_KEY = "mySecreteKeyurJJHKDKSLSLLSLSLSLOOEOOEORIIRIJSJJSJSNNNNCBBVBVNVNVNVNVKKV"; // Use environment variable for this in production

    private static final long EXPIRATION_TIME = 86400000; // 1 day

    Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String generateToken(String username, Role role) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .claim("name",username)
                .claim("role",role)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, secretKey) // Use injected key
                .compact();
    }

//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        try {  // Important: Add a try-catch block
//            final Claims claims = Jwts.parser() // Use parserBuilder for newer JJWT versions
//                    .setSigningKey(signingKey)
//                    .parseClaimsJws(token)
//                    .getBody();
//            return claimsResolver.apply(claims);
//        } catch (Exception e) { // Catch JWT-related exceptions (e.g., expired, invalid signature)
//            return null; // Or throw a custom exception if you prefer
//        }
//    }

    public boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);
        return extractedUsername != null && extractedUsername.equals(username) && !isTokenExpired(token);
    }




    public Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}