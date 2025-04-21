package com.uet.longhoang.engapp.engapp.controllers;

import com.uet.longhoang.engapp.engapp.entities.User;
import com.uet.longhoang.engapp.engapp.services.impls.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/test")
public class TestAuthentication {
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    UserService userService;

    @GetMapping("/encode")
    public String encodePassword(@RequestParam String password) {
        // So sánh mật khẩu đã nhập với mật khẩu lưu trong DB (đã mã hóa)
        return bCryptPasswordEncoder.encode(password);
    }
    @GetMapping("/user")
    public Optional<User> user() {
        return userService.findByUsername("Long");
    }

}
