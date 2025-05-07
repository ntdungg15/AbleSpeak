package com.uet.longhoang.engapp.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

public class Lesson {
    @Id
    private String id;
    private String title;
    private String description;
    private String category;
    private int level;
    private List<String> tags;
}
