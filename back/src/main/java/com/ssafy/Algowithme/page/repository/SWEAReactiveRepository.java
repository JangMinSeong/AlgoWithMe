package com.ssafy.Algowithme.page.repository;

import com.ssafy.Algowithme.problem.entity.SWEA;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface SWEAReactiveRepository extends ReactiveMongoRepository<SWEA, String> {
    Mono<SWEA> findByNumber(int number);
}
