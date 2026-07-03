package vn.edu.hcmuaf.fit.ThreePanthers.controllers;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.UpdateProfileRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CommentResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.PostSummaryResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.UserResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.services.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()") // Chỉ user đã đăng nhập mới được cập nhật profile
    public SuccessResponse<UserResponseDto> updateProfile(@Valid @RequestBody UpdateProfileRequestDto req) {
        return SuccessResponse.<UserResponseDto>builder()
                .status(200)
                .message("Cập nhật thông tin thành công")
                .data(userService.updateProfile(req))
                .build();
    }

    @GetMapping("/get-me")
    public SuccessResponse<UserResponseDto> getMe(){
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        
        return SuccessResponse.<UserResponseDto>builder()
        .status(200)
        .message("get me successfuly")
        .data(userService.getMe(userName))
        .build();
    }

    @PostMapping("/saved-posts/{slug}")
    public SuccessResponse<String> toggleSavedPost(@PathVariable String slug) {
        userService.toggleSavePost(slug);
        return SuccessResponse.<String>builder()
                .status(200)
                .message("Cập nhật trạng thái lưu thành công")
                .data(null)
                .build();
    }

    @GetMapping("/saved-posts")
    public SuccessResponse<List<PostSummaryResponseDto>> getSavedPosts() {
        return SuccessResponse.<List<PostSummaryResponseDto>>builder()
                .status(200)
                .message("Lấy danh sách bài đã lưu thành công")
                .data(userService.getSavedPosts())
                .build();
    }

    @GetMapping("/history")
    public SuccessResponse<List<PostSummaryResponseDto>> getViewedHistory() {
        return SuccessResponse.<List<PostSummaryResponseDto>>builder()
                .status(200)
                .message("Lấy lịch sử xem bài thành công")
                .data(userService.getViewedPosts())
                .build();
    }

    @GetMapping("/comments")
    public SuccessResponse<List<CommentResponseDto>> getUserComments() {
        return SuccessResponse.<List<CommentResponseDto>>builder()
                .status(200)
                .message("Lấy danh sách bình luận thành công")
                .data(userService.getUserComments())
                .build();
    }
}
