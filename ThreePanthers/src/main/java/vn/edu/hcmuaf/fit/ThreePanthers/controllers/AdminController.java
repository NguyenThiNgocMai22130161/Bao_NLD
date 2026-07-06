package vn.edu.hcmuaf.fit.ThreePanthers.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PageResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponse;
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
    public PageResponse<AdminUserResponseDto> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection) {
        
        Sort.Direction direction = sortDirection.equalsIgnoreCase("ASC") 
            ? Sort.Direction.ASC 
            : Sort.Direction.DESC;
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<AdminUserResponseDto> userPage = adminService.getUsers(pageable);
        
        return PageResponse.<AdminUserResponseDto>builder()
                .status(200)
                .message("Lấy danh sách người dùng thành công")
                .data(userPage.getContent())
                .page(userPage.getNumber())
                .size(userPage.getSize())
                .totalElements(userPage.getTotalElements())
                .totalPages(userPage.getTotalPages())
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
    public PageResponse<AdminPostResponseDto> getPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection) {
        
        Sort.Direction direction = sortDirection.equalsIgnoreCase("ASC") 
            ? Sort.Direction.ASC 
            : Sort.Direction.DESC;
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<AdminPostResponseDto> postPage = adminService.getPosts(pageable);
        
        return PageResponse.<AdminPostResponseDto>builder()
                .status(200)
                .message("Lấy danh sách bài viết thành công")
                .data(postPage.getContent())
                .page(postPage.getNumber())
                .size(postPage.getSize())
                .totalElements(postPage.getTotalElements())
                .totalPages(postPage.getTotalPages())
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
