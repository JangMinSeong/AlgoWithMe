package com.ssafy.Algowithme.mongo.repository;

import com.ssafy.Algowithme.mongo.model.SWEA;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface SWEAReactiveRepository extends ReactiveMongoRepository<SWEA, String> {
    Mono<SWEA> findByNumber(int number);
}
