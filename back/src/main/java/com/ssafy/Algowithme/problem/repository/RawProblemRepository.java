package com.ssafy.Algowithme.problem.repository;

import com.ssafy.Algowithme.problem.entity.RawProblem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RawProblemRepository extends MongoRepository<RawProblem, Long> {
}
