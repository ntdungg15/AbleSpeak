package com.uet.longhoang.engapp.repositories;

import com.uet.longhoang.engapp.entities.Dialogue;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DialogueRepository extends MongoRepository<Dialogue, String> {

}
