package com.ssafy.Algowithme.code.controller;

import com.ssafy.Algowithme.code.dto.request.Editor;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CodeEditController {

    @MessageMapping("/code/{codeId}")
    @SendTo("/topic/{codeId}")
    public String sharingEditorCode(@DestinationVariable("codeId") int codeId, String code) throws Exception {
        System.out.println("codeId: " + codeId + ", code: " + code);
        // redis 저장 로직 필요
        return code;
    }
}

