package com.uet.longhoang.engapp.engapp.mappers;

import com.uet.longhoang.engapp.engapp.dtos.UserInfo;
import com.uet.longhoang.engapp.engapp.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserMapper {
    public static UserInfo mapUserToUserInfo(User u) {
        UserInfo userInfo = new UserInfo();
        userInfo.setEmail(u.getEmail());
        userInfo.setName(u.getName());
        userInfo.setPhone(u.getPhone());

        return userInfo;

    }
}
