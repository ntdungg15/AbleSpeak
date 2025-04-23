package com.uet.longhoang.engapp.engapp.controllers;

import com.uet.longhoang.engapp.engapp.entities.User;
import com.uet.longhoang.engapp.engapp.services.impls.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("userInfo")
    public ResponseEntity<?> getUserInfo(@RequestParam String username) {
        if (userService.findByUsername(username).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = userService.findByUsername(username).get();
        return ResponseEntity.ok(userService.getUserInfo(user));
    }

}
