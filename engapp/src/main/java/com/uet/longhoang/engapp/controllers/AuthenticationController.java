package com.uet.longhoang.engapp.engapp.controllers;

import com.uet.longhoang.engapp.engapp.dtos.LoginInput;
import com.uet.longhoang.engapp.engapp.dtos.LoginResponse;
import com.uet.longhoang.engapp.engapp.dtos.RegisterInput;
import com.uet.longhoang.engapp.engapp.dtos.RegisterResponse;
import com.uet.longhoang.engapp.engapp.entities.User;
import com.uet.longhoang.engapp.engapp.exceptions.EmailAlreadyExistsException;
import com.uet.longhoang.engapp.engapp.exceptions.NameAlreadyExistsException;
import com.uet.longhoang.engapp.engapp.services.impls.AuthenticationService;
import com.uet.longhoang.engapp.engapp.services.impls.JwtService;
import com.uet.longhoang.engapp.engapp.services.impls.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private JwtService jwtService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginInput loginInput) {
        try {
            User user = authenticationService.authenticate(loginInput);
            String token = jwtService.generateToken(new UserDetailsImpl(user));
            return ResponseEntity.ok(new LoginResponse(token));
        } catch (BadCredentialsException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e  .getMessage());
            log.error(error.toString());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterInput registerInput) {
        try {
            User user = authenticationService.register(registerInput);
            if (user != null) {
                return ResponseEntity.ok(new RegisterResponse("Registered successfully with username " + registerInput.getName()));
            }
        } catch (NameAlreadyExistsException | EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(registerInput);
    }
}
