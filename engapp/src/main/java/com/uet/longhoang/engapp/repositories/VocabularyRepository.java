package com.uet.longhoang.engapp.repositories;

import com.uet.longhoang.engapp.entities.Vocabulary;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VocabularyRepository extends MongoRepository<Vocabulary, String> {
}
