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

    @MessageMapping("/study/{codeId}")
    @SendTo("/topic/study/{codeId}")
    public Editor sharingEditorCode(@DestinationVariable("codeId") int codeId, Editor editor) throws Exception {
        System.out.println("codeId: " + codeId + ", code: " + editor.getCode());

        return editor;
    }
}

