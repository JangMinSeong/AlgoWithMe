package com.ssafy.Algowithme.team.controller;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.team.dto.response.OpenviduConnectionResponse;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/openvidu")
@RequiredArgsConstructor
public class OpenviduController {

    private final OpenVidu openVidu;

    @PostMapping("/sessions/{studyId}")
    public ResponseEntity<String> initiateSession(@PathVariable String studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        openVidu.createSession(new SessionProperties.Builder().customSessionId(studyId).build());
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/sessions/{studyId}/connections")
    public ResponseEntity<OpenviduConnectionResponse> createConnection(@PathVariable String studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(studyId);
        if (session == null)
            session = openVidu.createSession(new SessionProperties.Builder().customSessionId(studyId).build());
        Connection connection = session.createConnection();
        return ResponseEntity.ok(new OpenviduConnectionResponse(connection.getToken()));
    }
}
