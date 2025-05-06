package com.uet.longhoang.engapp.services.interfaces;


import com.uet.longhoang.engapp.dtos.LoginInput;
import com.uet.longhoang.engapp.dtos.RegisterInput;
import com.uet.longhoang.engapp.entities.User;
import com.uet.longhoang.engapp.exceptions.EmailAlreadyExistsException;
import com.uet.longhoang.engapp.exceptions.NameAlreadyExistsException;
import org.springframework.security.authentication.BadCredentialsException;

public interface IAuthenticationService {
    public User authenticate(LoginInput loginInput) throws BadCredentialsException;
    public User register(RegisterInput registerInput) throws EmailAlreadyExistsException, NameAlreadyExistsException;
}
