package com.uet.longhoang.engapp.engapp.repositories;

import com.uet.longhoang.engapp.engapp.entities.GrammarRule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrammarRuleRepository extends MongoRepository<GrammarRule, String> {
}
