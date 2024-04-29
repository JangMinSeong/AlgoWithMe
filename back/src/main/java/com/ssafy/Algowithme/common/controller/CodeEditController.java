package com.ssafy.Algowithme.common.controller;

import com.ssafy.Algowithme.common.entity.EditCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CodeEditController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/code-edit/{pageId}/{codeId}")
    @SendTo("/topic/greetings")
    public String greeting(@PathVariable("pageId") int pageId, @PathVariable("codeId") int codeId, String code) throws Exception {
        String destination = "/topic/study/" + pageId;
        EditCode response = new EditCode(codeId, code);
        messagingTemplate.convertAndSend(destination, response);
    }
}

