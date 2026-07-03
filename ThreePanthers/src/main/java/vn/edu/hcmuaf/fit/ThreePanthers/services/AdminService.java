package vn.edu.hcmuaf.fit.ThreePanthers.services;

import java.util.List;

import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.AdminUpdatePostRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.AdminUpdateUserRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AdminPostResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AdminUserResponseDto;

public interface AdminService {
    List<AdminUserResponseDto> getUsers();
    AdminUserResponseDto updateUser(String userId, AdminUpdateUserRequestDto req);
    void deleteUser(String userId);
    List<AdminPostResponseDto> getPosts();
    AdminPostResponseDto updatePost(String postId, AdminUpdatePostRequestDto req);
    void deletePost(String postId);
}
