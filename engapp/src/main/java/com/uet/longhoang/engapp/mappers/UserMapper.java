package com.uet.longhoang.engapp.mappers;

import com.uet.longhoang.engapp.dtos.UserInfo;
import com.uet.longhoang.engapp.entities.User;

public class UserMapper {
    public static UserInfo mapUserToUserInfo(User u) {
        UserInfo userInfo = new UserInfo();
        userInfo.setEmail(u.getEmail());
        userInfo.setName(u.getName());
        userInfo.setPhone(u.getPhone());

        return userInfo;

    }
}
