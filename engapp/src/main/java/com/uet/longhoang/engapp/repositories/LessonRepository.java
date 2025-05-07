package com.uet.longhoang.engapp.repositories;

import com.uet.longhoang.engapp.entities.Lesson;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LessonRepository extends MongoRepository<Lesson, String> {
    List<Lesson> findByCategory(String category);
    List<Lesson> findByLevel(int level);
    List<Lesson> findByTitleContainingIgnoreCase(String keyword);
}