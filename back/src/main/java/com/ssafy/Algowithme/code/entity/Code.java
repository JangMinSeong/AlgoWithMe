package com.ssafy.Algowithme.code.entity;

import com.ssafy.Algowithme.code.dto.request.SaveCodeRequest;
import com.ssafy.Algowithme.code.type.Language;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "CODE", timeToLive = 300)
@AllArgsConstructor(access= AccessLevel.PROTECTED)
public class Code {
    @Id
    private Long id;
    private String code;
    private Language language;

    static public Code fromDto(SaveCodeRequest dto) {
        return new Code(
                dto.getCodeId(),
                dto.getCode(),
                dto.getLanguage()
        );
    }
}
