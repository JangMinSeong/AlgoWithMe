package com.ssafy.Algowithme.mongo.repository;

import com.ssafy.Algowithme.mongo.model.BOJ;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BOJRepository extends MongoRepository<BOJ, String> {
    Optional<BOJ> findByNumber(int number);
}
