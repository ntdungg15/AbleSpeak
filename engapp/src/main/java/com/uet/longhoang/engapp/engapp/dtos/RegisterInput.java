package com.uet.longhoang.engapp.engapp.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterInput {
    private String name;
    private String email;
    private String password;
    private String phone;
}
