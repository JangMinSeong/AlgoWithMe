package com.ssafy.Algowithme.code.controller;

import com.ssafy.Algowithme.code.dto.request.SocketMessage;
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
  public SocketMessage sharingEditorCode(@DestinationVariable("codeId") int codeId,
                                         SocketMessage message) throws Exception {
    System.out.println("codeId: " + codeId + ", code: " + message);
    return message;
  }

  @MessageMapping("/codeTab/{userId}")
  @SendTo("/topic/codeTab/{userId}")
  public String updateCodeTab(@DestinationVariable("userId") int userId,
                              String message) throws Exception {
    System.out.println("userId: " + userId + ", message: " + message);
    return message;
  }

  @MessageMapping("/study/{groupId}")
  @SendTo("/topic/study/{groupId}")
  public String updateStudy(@DestinationVariable("groupId") int groupId,
                            String message) throws Exception {
    System.out.println("groupId: " + groupId + ", message: " + message);
    return message;
  }
}

