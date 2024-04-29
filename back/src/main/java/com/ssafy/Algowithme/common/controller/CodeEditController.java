package com.ssafy.Algowithme.common.controller;

import com.ssafy.Algowithme.common.entity.Greeting;
import com.ssafy.Algowithme.common.entity.HelloMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@RestController
@RequiredArgsConstructor
public class CodeEditController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/hello/{pageId}/{codeId}")
    @SendTo("/topic/greetings")
    public Greeting test(@DestinationVariable("pageId") int pageId, @DestinationVariable("codeId") int codeId, HelloMessage message) throws Exception {
        System.out.println("pageId: " + pageId + ", codeId: " + codeId);
//        String destination = "/topic/study/" + pageId;
//        messagingTemplate.convertAndSend(destination, new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!"));
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }
}

