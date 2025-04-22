package com.uet.longhoang.engapp.engapp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "grammarRules")
public class GrammarRule {
    @Id
    private String id;
    private String title;
    private String explanation;
    private List<String> examples;
    private List<Exercise> exercises;

}
@Data
@AllArgsConstructor
@NoArgsConstructor
class Exercise {
    private String question;
    private List<String> options;
    private int correctAnswer;
}