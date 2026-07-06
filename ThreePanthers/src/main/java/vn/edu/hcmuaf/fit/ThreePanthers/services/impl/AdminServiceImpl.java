package vn.edu.hcmuaf.fit.ThreePanthers.services.impl;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostStatus;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.AdminUpdatePostRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.AdminUpdateUserRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AdminPostResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AdminUserResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.PostEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.UserEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.exeptions.ResourceNotFoundException;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.PostRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.UserRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.services.AdminService;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AdminUserResponseDto> getUsers() {
        return userRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(this::toUserDto)
                .toList();
    }

    @Override
    @Transactional
    public AdminUserResponseDto updateUser(String userId, AdminUpdateUserRequestDto req) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User không tồn tại"));

        user.setRole(req.getRole());
        user.setStatus(req.getStatus());

        return toUserDto(userRepository.save(user));
    }

    @Override
    @Transactional
    public void deleteUser(String userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User không tồn tại"));

        userRepository.delete(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminPostResponseDto> getPosts() {
        Pageable pageable = PageRequest.of(0, 500, Sort.by(Sort.Direction.DESC, "createdAt"));
        return postRepository.findAll(pageable)
                .stream()
                .map(this::toPostDto)
                .toList();
    }

    @Override
    @Transactional
    public AdminPostResponseDto updatePost(String postId, AdminUpdatePostRequestDto req) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Bài viết không tồn tại"));

        post.setStatus(req.getStatus());
        post.setIsFeatured(req.getIsFeatured());

        if (req.getStatus() == PostStatus.PUBLISHED && post.getPublishedAt() == null) {
            post.setPublishedAt(java.time.LocalDateTime.now());
        }

        return toPostDto(postRepository.save(post));
    }

    @Override
    @Transactional
    public void deletePost(String postId) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Bài viết không tồn tại"));

        postRepository.delete(post);
    }

    private AdminUserResponseDto toUserDto(UserEntity user) {
        return AdminUserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    private AdminPostResponseDto toPostDto(PostEntity post) {
        return AdminPostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .slug(post.getSlug())
                .status(post.getStatus())
                .isFeatured(post.getIsFeatured())
                .type(post.getType())
                .author(post.getAuthor() != null ? post.getAuthor().getUsername() : null)
                .category(post.getCategory() != null ? post.getCategory().getName() : null)
                .publishedAt(post.getPublishedAt())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}
