package com.uet.longhoang.engapp.engapp.repositories;

import com.uet.longhoang.engapp.engapp.entities.Vocabulary;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VocabularyRepository extends MongoRepository<Vocabulary, String> {
}
