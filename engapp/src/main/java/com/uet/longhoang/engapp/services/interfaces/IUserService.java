package com.uet.longhoang.engapp.engapp.services.interfaces;


import com.uet.longhoang.engapp.engapp.dtos.UpdateUserDTO;
import com.uet.longhoang.engapp.engapp.dtos.UserInfo;
import com.uet.longhoang.engapp.engapp.entities.User;

import java.util.Optional;

public interface IUserService {
    public Optional<User> findByUsername(String username);
    public Optional<User> findByEmail(String email);
    public UserInfo getUserInfo(User user);
    public User updateUser(UpdateUserDTO user) throws Exception;
}
