package com.uet.longhoang.engapp.engapp.services.impls;

import com.uet.longhoang.engapp.engapp.dtos.LoginInput;
import com.uet.longhoang.engapp.engapp.dtos.RegisterInput;
import com.uet.longhoang.engapp.engapp.entities.User;
import com.uet.longhoang.engapp.engapp.exceptions.EmailAlreadyExistsException;
import com.uet.longhoang.engapp.engapp.exceptions.NameAlreadyExistsException;
import com.uet.longhoang.engapp.engapp.repositories.UserRepository;
import com.uet.longhoang.engapp.engapp.services.interfaces.IAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
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
        if (userRepository.findByName(registerInput.getName()).isPresent()) {
            throw new NameAlreadyExistsException("Name already exists");
        }
        if (userRepository.findByEmail(registerInput.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        User user = new User();
        user.setName(registerInput.getName());
        user.setEmail(registerInput.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(registerInput.getPassword()));
        userRepository.save(user);
        return user;
    }
}
