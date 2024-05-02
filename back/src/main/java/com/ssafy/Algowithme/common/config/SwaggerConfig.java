package com.ssafy.Algowithme.common.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "Algowithme API",
                description = "Algowithme api명세서입니다.",
                version = "v1"))
@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi SampleOpenApi() {
        String[] paths = {"/**"};

        return GroupedOpenApi.builder()
                .group("Algowithme v1")
                .pathsToMatch(paths)
                .build();
    }
}
