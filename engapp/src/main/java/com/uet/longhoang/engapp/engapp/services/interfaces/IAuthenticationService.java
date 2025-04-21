package com.uet.longhoang.engapp.engapp.services.interfaces;


import com.uet.longhoang.engapp.engapp.dtos.LoginInput;
import com.uet.longhoang.engapp.engapp.dtos.RegisterInput;
import com.uet.longhoang.engapp.engapp.entities.User;
import com.uet.longhoang.engapp.engapp.exceptions.EmailAlreadyExistsException;
import com.uet.longhoang.engapp.engapp.exceptions.NameAlreadyExistsException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface IAuthenticationService {
    public User authenticate(LoginInput loginInput) throws BadCredentialsException;
    public User register(RegisterInput registerInput) throws EmailAlreadyExistsException, NameAlreadyExistsException;
}
