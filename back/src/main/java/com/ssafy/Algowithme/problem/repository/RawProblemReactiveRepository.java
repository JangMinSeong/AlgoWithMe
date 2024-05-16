package com.ssafy.Algowithme.problem.repository;

import com.ssafy.Algowithme.problem.entity.RawProblem;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface RawProblemReactiveRepository extends ReactiveMongoRepository<RawProblem, String> {

}
