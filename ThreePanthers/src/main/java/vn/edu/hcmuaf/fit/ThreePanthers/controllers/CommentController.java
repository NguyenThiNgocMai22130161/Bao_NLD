package vn.edu.hcmuaf.fit.ThreePanthers.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.CommentRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CommentResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.services.CommentService;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public SuccessResponse<List<CommentResponseDto>> getComments(@PathVariable String postId) {
        return SuccessResponse.<List<CommentResponseDto>>builder()
                .status(200)
                .message("Lấy danh sách bình luận thành công")
                .data(commentService.getCommentsByPost(postId))
                .build();
    }

    @PostMapping
    public SuccessResponse<CommentResponseDto> createComment(
            @PathVariable String postId,
            @RequestBody CommentRequestDto req) {
        
        return SuccessResponse.<CommentResponseDto>builder()
                .status(201) 
                .message("Bình luận thành công")
                .data(commentService.createComment(postId, req))
                .build();
    }
}