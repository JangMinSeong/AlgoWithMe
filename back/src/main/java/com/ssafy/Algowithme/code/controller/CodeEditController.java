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

    @MessageMapping("/study/{pageId}")
    @SendTo("/topic/study/{pageId}")
    public Editor sharingEditorCode(@DestinationVariable("pageId") int pageId, Editor editor) throws Exception {
        System.out.println("pageId: " + pageId + ", codeId: " + editor.getCodeId() + ", code: " + editor.getCode());
        return editor;
    }
}

