package com.uet.longhoang.engapp.repositories;

import com.uet.longhoang.engapp.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);
}
