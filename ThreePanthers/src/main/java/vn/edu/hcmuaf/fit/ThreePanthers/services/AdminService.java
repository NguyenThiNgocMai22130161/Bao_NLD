package vn.edu.hcmuaf.fit.ThreePanthers.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.AdminUpdatePostRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.AdminUpdateUserRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AdminPostResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AdminUserResponseDto;

public interface AdminService {
    Page<AdminUserResponseDto> getUsers(Pageable pageable);
    AdminUserResponseDto updateUser(String userId, AdminUpdateUserRequestDto req);
    void deleteUser(String userId);
    Page<AdminPostResponseDto> getPosts(Pageable pageable);
    AdminPostResponseDto updatePost(String postId, AdminUpdatePostRequestDto req);
    void deletePost(String postId);
}
