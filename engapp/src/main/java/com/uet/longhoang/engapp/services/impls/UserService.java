package com.uet.longhoang.engapp.engapp.services.impls;

import com.uet.longhoang.engapp.engapp.dtos.UpdateUserDTO;
import com.uet.longhoang.engapp.engapp.dtos.UserInfo;
import com.uet.longhoang.engapp.engapp.entities.User;
import com.uet.longhoang.engapp.engapp.mappers.UserMapper;
import com.uet.longhoang.engapp.engapp.repositories.UserRepository;
import com.uet.longhoang.engapp.engapp.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.ParameterResolutionDelegate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByName(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserInfo getUserInfo(User user) {
        return UserMapper.mapUserToUserInfo(user);
    }

    @Override
    public User updateUser(UpdateUserDTO userInfo) throws Exception {
        Optional<User> userOpt = userRepository.findByEmail(userInfo.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setName(userInfo.getName());
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }
        throw new Exception("User not found");
    }
}
