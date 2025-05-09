package com.uet.longhoang.engapp.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "vocabularies")
public class VocabularyWord {
    @Id
    private String id;
    private String word;
    private List<Phonetic> phonetics;
    private List<Meaning> meanings;
    private boolean isLearned;
    private String lessonId;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Phonetic {
        private String text;
        private String audio;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Meaning {
        private String partOfSpeech;
        private List<Definition> definitions;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Definition {
        private String definition;
        private String example;
    }
}