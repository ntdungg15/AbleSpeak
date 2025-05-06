package com.uet.longhoang.engapp.engapp.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vocabularies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vocabulary {

    @Id
    private String id;

    private String word;
    private String meaning;
    private String example;
    private String pronunciation;
    private String audioLink;
}