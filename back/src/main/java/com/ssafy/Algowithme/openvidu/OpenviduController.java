package com.ssafy.Algowithme.openvidu;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
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
    public ResponseEntity<String> initiateSession(@PathVariable Long studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        openVidu.createSession(new SessionProperties.Builder().customSessionId(studyId.toString()).build());
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/sessions/{studyId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable String studyId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(studyId);
        if (session == null) throw new CustomException(ExceptionStatus.OPENVIDU_SESSION_NOT_FOUND);
        Connection connection = session.createConnection();
        return ResponseEntity.ok(connection.getToken());
    }
}
