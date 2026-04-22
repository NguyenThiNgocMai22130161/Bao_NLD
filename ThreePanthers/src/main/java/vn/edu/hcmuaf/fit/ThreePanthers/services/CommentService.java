package vn.edu.hcmuaf.fit.ThreePanthers.services;

import java.util.List;

import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.CommentRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CommentResponseDto;

public interface CommentService {
    List<CommentResponseDto> getCommentsByPost(String postId);
    CommentResponseDto createComment(String postId, CommentRequestDto req);
}