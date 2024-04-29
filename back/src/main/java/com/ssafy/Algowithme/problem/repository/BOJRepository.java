package com.ssafy.Algowithme.problem.repository;

import com.ssafy.Algowithme.problem.entity.BOJ;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BOJRepository extends MongoRepository<BOJ, String> {
    Optional<BOJ> findByNumber(int number);
}
