package com.ssafy.Algowithme.page.controller;

import com.ssafy.Algowithme.common.exception.ErrorResponse;
import com.ssafy.Algowithme.page.dto.request.CreateDocsPageRequest;
import com.ssafy.Algowithme.page.dto.request.CreateProblemPageRequest;
import com.ssafy.Algowithme.page.dto.request.UpdateMemoRequest;
import com.ssafy.Algowithme.page.dto.request.UpdatePagePositionRequest;
import com.ssafy.Algowithme.page.dto.response.CreateDocsPageResponse;
import com.ssafy.Algowithme.page.dto.response.CreateProblemPageResponse;
import com.ssafy.Algowithme.page.dto.response.MemoResponse;
import com.ssafy.Algowithme.page.dto.response.PageListResponse;
import com.ssafy.Algowithme.page.service.PageService;
import com.ssafy.Algowithme.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/page")
@RequiredArgsConstructor
public class PageController {

    private final PageService pageService;

    @GetMapping("/team/{teamId}")
    @Operation(summary = "스터디 내 페이지 조회", description = "스터디의 페이지 리스트를 반환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = {@Content(schema = @Schema(implementation = PageListResponse.class))}),
            @ApiResponse(responseCode = "400", description = "조회 실패")
    })
    public ResponseEntity<PageListResponse> getPageList(@PathVariable("teamId") Long teamId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(pageService.getPageList(teamId, user));
    }


    @PostMapping("/docs")
    @Operation(summary = "문서 페이지 생성", description = "팀 아이디와 상위 페이지 아이디를 입력하여, 페이지를 생성한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "페이지 생성 성공", content = {@Content(schema = @Schema(implementation = CreateDocsPageResponse.class))}),
            @ApiResponse(responseCode = "1100", description = "팀이 존재하지 않습니다.", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1200", description = "상위 페이지가 존재하지 않습니다.", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<CreateDocsPageResponse> createDocsPage(@RequestBody CreateDocsPageRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(pageService.createDocsPage(request, user));
    }

    @PostMapping("/problem")
    @Operation(summary = "문제 페이지 생성", description = "팀 아이디, 상위 페이지 아이디, 문제 아이디를 입력하여, 문제 페이지를 생성한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "페이지 생성 성공", content = {@Content(schema = @Schema(implementation = CreateProblemPageResponse.class))}),
            @ApiResponse(responseCode = "1100", description = "팀이 존재하지 않습니다.", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1200", description = "상위 페이지가 존재하지 않습니다.", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1400", description = "문제가 존재하지 않습니다.", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<CreateProblemPageResponse> createProblem(@RequestBody CreateProblemPageRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(pageService.createProblemPage(request, user));
    }

    @PutMapping("/position")
    @Operation(summary = "페이지 위치 변경", description = "페이지의 위치를 변경한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "페이지 위치 변경 성공"),
            @ApiResponse(responseCode = "400", description = "페이지 위치 변경 실패", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<?> updatePosition(@RequestBody UpdatePagePositionRequest request, @AuthenticationPrincipal User user) {
        pageService.updatePosition(request, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/memo/{pageId}")
    @Operation(summary = "개인메모 조회", description = "pageId 에 해당하는 개인 메모를 조회한다. 조회가 안 될 경우 생성해서 반환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공", content = {@Content(schema = @Schema(implementation = MemoResponse.class))}),
            @ApiResponse(responseCode = "400", description = "조회 실패"),
            @ApiResponse(responseCode = "1200", description = "페이지가 존재하지 않습니다.", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
    })
    public ResponseEntity<MemoResponse> getMemo(@PathVariable("pageId") Long pageId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(pageService.getMemo(pageId, user));
    }

    @PutMapping("/memo")
    @Operation(summary = "개인메모 저장", description = "pageId 에 해당하는 개인 메모를 수정한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "수정 성공", content = {@Content(schema = @Schema(implementation = MemoResponse.class))}),
            @ApiResponse(responseCode = "400", description = "수정 실패"),
            @ApiResponse(responseCode = "1200", description = "개인메모가 존재하지 않습니다.", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
    })
    public ResponseEntity<Void> updateMemo(@RequestBody UpdateMemoRequest request) {
        pageService.updateMemo(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{pageId}")
    @Operation(summary = "페이지 제목 변경", description = "해당 페이지의 제목을 변경한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "페이지 제목 변경 성공"),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1200", description = "페이지가 존재하지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<Void> changePageTitle(@AuthenticationPrincipal User user,
                                                @PathVariable Long pageId,
                                                @RequestBody String title) {
        pageService.changePageTitle(user, pageId, title);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{pageId}")
    @Operation(summary = "페이지 삭제", description = "해당 페이지를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "페이지 삭제 성공"),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<Void> deletePage(@AuthenticationPrincipal User user,
                                           @PathVariable Long pageId) {
        pageService.deletePage(user, pageId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/parent/{pageId}")
    @Operation(summary = "부모 페이지 변경", description = "부모 페이지를 변경한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "부모 페이지 변경 성공"),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1200", description = "페이지가 존재하지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1202", description = "자신의 자식페이지를 부모페이지로 할 수 없습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<Void> changeParentPage(@AuthenticationPrincipal User user,
                                                 @PathVariable Long pageId,
                                                 @RequestBody Long parentId){
        pageService.changeParentPage(user, pageId, parentId);
        return ResponseEntity.ok().build();
    }
}
