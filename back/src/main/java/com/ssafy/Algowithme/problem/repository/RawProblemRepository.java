package com.ssafy.Algowithme.problem.repository;

import com.ssafy.Algowithme.problem.entity.RawProblem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RawProblemRepository extends MongoRepository<RawProblem, String> {
}
