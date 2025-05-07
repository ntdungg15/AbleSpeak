package com.uet.longhoang.engapp.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "dialogues")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dialogue {

    @Id
    private String id; // MongoDB sẽ tự động tạo trường _id cho bạn

    private String character;
    private String text;
    private String audioLink;
    private String translation;
}
