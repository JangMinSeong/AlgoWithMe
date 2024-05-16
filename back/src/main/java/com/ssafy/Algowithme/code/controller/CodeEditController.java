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
    // redis 저장 로직 필요
    return message;
  }

  @MessageMapping("/codeTab/{userId}")
  @SendTo("/topic/codeTab/{userId}")
  public String updateCodeTab(@DestinationVariable("userId") int userId,
                              String message) throws Exception {
    System.out.println("codeId: " + userId + ", code: " + message);
    // redis 저장 로직 필요
    return message;
  }

  @MessageMapping("/study/{groupId}")
  @SendTo("/topic/study/{groupId}")
  public String updateStudy(@DestinationVariable("groupId") int groupId,
                            String message) throws Exception {
    System.out.println("codeId: " + groupId + ", code: " + message);
    // redis 저장 로직 필요
    return message;
  }
}

