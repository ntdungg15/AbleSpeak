package com.uet.longhoang.engapp.services.impls;

import com.uet.longhoang.engapp.dtos.LoginInput;
import com.uet.longhoang.engapp.dtos.RegisterInput;
import com.uet.longhoang.engapp.entities.User;
import com.uet.longhoang.engapp.exceptions.EmailAlreadyExistsException;
import com.uet.longhoang.engapp.exceptions.NameAlreadyExistsException;
import com.uet.longhoang.engapp.repositories.UserRepository;
import com.uet.longhoang.engapp.services.interfaces.IAuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthenticationService implements IAuthenticationService {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public User authenticate(LoginInput loginInput) throws BadCredentialsException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginInput.getUsername(), loginInput.getPassword()));
        if (authentication.isAuthenticated()) {
            User user = userRepository.findByName(loginInput.getUsername()).get();
            return user;
        }
        throw new BadCredentialsException("Invalid username or password");
    }

    @Override
    public User register(RegisterInput registerInput) throws EmailAlreadyExistsException, NameAlreadyExistsException {
        log.info("Registering new user");
        if (userRepository.findByName(registerInput.getName()).isPresent()) {
            log.info("User already exists");
            throw new NameAlreadyExistsException("Name already exists");
        }
        if (userRepository.findByEmail(registerInput.getEmail()).isPresent()) {
            log.info("User already exists");
            throw new EmailAlreadyExistsException("Email already exists");
        }
        User user = new User();
        user.setName(registerInput.getName());
        user.setEmail(registerInput.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(registerInput.getPassword()));
        userRepository.save(user);
        log.info("Registered new user");
        return user;
    }
}
