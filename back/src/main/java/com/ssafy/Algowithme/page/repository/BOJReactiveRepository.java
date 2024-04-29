package com.ssafy.Algowithme.page.repository;


import com.ssafy.Algowithme.page.entity.BOJ;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface BOJReactiveRepository extends ReactiveMongoRepository<BOJ, String> {
    Mono<BOJ> findByNumber(int number);
}
