package com.uet.longhoang.engapp.repositories;

import com.uet.longhoang.engapp.entities.VocabularyWord;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VocabularyRepoTopic extends MongoRepository<VocabularyWord, String> {
    List<VocabularyWord> findByLessonId(String lessonId);
    
    List<VocabularyWord> findByWordContainingIgnoreCase(String keyword);
    
    long countByLessonId(String lessonId);
    
    long countByLessonIdAndIsLearnedTrue(String lessonId);
}