package com.uet.longhoang.engapp.controllers;

import com.uet.longhoang.engapp.dtos.UpdateUserDTO;
import com.uet.longhoang.engapp.entities.User;
import com.uet.longhoang.engapp.services.impls.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/userInfo")
    public ResponseEntity<?> getUserInfo(@RequestParam String username) {
        if (userService.findByUsername(username).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = userService.findByUsername(username).get();
        return ResponseEntity.ok(userService.getUserInfo(user));
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUserInfo(@RequestBody UpdateUserDTO userInfo) {
        try {
            userService.updateUser(userInfo);
            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
