package com.ssafy.Algowithme.mongo.repository;

import com.ssafy.Algowithme.mongo.model.BOJ;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface BOJReactiveRepository extends ReactiveMongoRepository<BOJ, String> {
    Mono<BOJ> findByNumber(int number);
}
