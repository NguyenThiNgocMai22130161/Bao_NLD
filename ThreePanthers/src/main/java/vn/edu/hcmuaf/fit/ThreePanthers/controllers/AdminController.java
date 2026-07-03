package vn.edu.hcmuaf.fit.ThreePanthers.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponseList;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.AdminUpdatePostRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.AdminUpdateUserRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AdminPostResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AdminUserResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.services.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')") // Chỉ ADMIN mới được truy cập toàn bộ controller này
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/users")
    public SuccessResponseList<AdminUserResponseDto> getUsers() {
        return SuccessResponseList.<AdminUserResponseDto>builder()
                .status(200)
                .message("Lấy danh sách người dùng thành công")
                .data(adminService.getUsers())
                .build();
    }

    @PatchMapping("/users/{id}")
    public SuccessResponse<AdminUserResponseDto> updateUser(
            @PathVariable String id,
            @Valid @RequestBody AdminUpdateUserRequestDto req) {
        return SuccessResponse.<AdminUserResponseDto>builder()
                .status(200)
                .message("Cập nhật người dùng thành công")
                .data(adminService.updateUser(id, req))
                .build();
    }

    @DeleteMapping("/users/{id}")
    public SuccessResponse<Void> deleteUser(@PathVariable String id) {
        adminService.deleteUser(id);

        return SuccessResponse.<Void>builder()
                .status(200)
                .message("Xóa người dùng thành công")
                .data(null)
                .build();
    }

    @GetMapping("/posts")
    public SuccessResponseList<AdminPostResponseDto> getPosts() {
        return SuccessResponseList.<AdminPostResponseDto>builder()
                .status(200)
                .message("Lấy danh sách bài viết thành công")
                .data(adminService.getPosts())
                .build();
    }

    @PatchMapping("/posts/{id}")
    public SuccessResponse<AdminPostResponseDto> updatePost(
            @PathVariable String id,
            @Valid @RequestBody AdminUpdatePostRequestDto req) {
        return SuccessResponse.<AdminPostResponseDto>builder()
                .status(200)
                .message("Cập nhật bài viết thành công")
                .data(adminService.updatePost(id, req))
                .build();
    }

    @DeleteMapping("/posts/{id}")
    public SuccessResponse<Void> deletePost(@PathVariable String id) {
        adminService.deletePost(id);

        return SuccessResponse.<Void>builder()
                .status(200)
                .message("Xóa bài viết thành công")
                .data(null)
                .build();
    }
}
