package vn.edu.hcmuaf.fit.ThreePanthers.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.UpdateProfileRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.*;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.*;
import vn.edu.hcmuaf.fit.ThreePanthers.exeptions.ResourceNotFoundException;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.*;
import vn.edu.hcmuaf.fit.ThreePanthers.services.UserService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PostViewRepository postViewRepository;
    private final CommentRepository commentRepository;

    private UserEntity getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private PostSummaryResponseDto mapPostToDto(PostEntity e) {
        PostSummaryResponseDto dto = new PostSummaryResponseDto();
        dto.setId(e.getId());
        dto.setTitle(e.getTitle());
        dto.setSummary(e.getSummary());
        dto.setThumbnail(e.getThumbnail());
        dto.setPublishedAt(e.getPublishedAt());
        dto.setViewCount(e.getViewCount());
        dto.setIsFeatured(e.getIsFeatured());
        if (e.getAuthor() != null) dto.setAuthor(e.getAuthor().getUsername());
        dto.setCategory(e.getCategory());
        dto.setTags(e.getTags());
        return dto;
    }

    @Override
    @Transactional
    public void toggleSavePost(String slug) {
        UserEntity user = getCurrentUser();
        PostEntity post = postRepository.findBySlug(slug);
        if (post == null) throw new ResourceNotFoundException("Bài viết không tồn tại");

        Set<PostEntity> savedPosts = user.getSavedPosts();
        if (savedPosts.contains(post)) {
            savedPosts.remove(post); 
        } else {
            savedPosts.add(post);
        }
        userRepository.save(user);
    }

    @Override
    public List<PostSummaryResponseDto> getSavedPosts() {
        UserEntity user = getCurrentUser();
        return user.getSavedPosts().stream()
                .map(this::mapPostToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostSummaryResponseDto> getViewedPosts() {
        UserEntity user = getCurrentUser();
        List<PostViewEntity> views = postViewRepository.findByUserOrderByViewedAtDesc(user);
        
        return views.stream()
                .map(PostViewEntity::getPost)
                .distinct()
                .map(this::mapPostToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDto> getUserComments() {
        UserEntity user = getCurrentUser();
        
        List<CommentEntity> comments = commentRepository.findByUserId(
            user.getId(), 
            Sort.by(Sort.Direction.DESC, "createdAt")
        );
        
        return comments.stream().map(entity -> {
            CommentResponseDto dto = new CommentResponseDto();
            dto.setId(entity.getId());
            dto.setContent(entity.getContent());
            dto.setCreatedAt(entity.getCreatedAt());
            dto.setUser(user.getUsername());

            if (entity.getPost() != null) {
                dto.setPostSlug(entity.getPost().getSlug());
                dto.setPostTitle(entity.getPost().getTitle());
            }
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getMe(String userName) {
        UserEntity user = userRepository.findByUsername(userName).get();

        return toUserResponse(user);
    }

    public static UserResponseDto toUserResponse(UserEntity entity){
        return UserResponseDto.builder()
        .id(entity.getId())
        .email(entity.getEmail())
        .username(entity.getUsername())
        .createdAt(entity.getCreatedAt())
        .updatedAt(entity.getUpdatedAt())
        .build();
    }

    @Override
    @Transactional
    public UserResponseDto updateProfile(UpdateProfileRequestDto req) {
        UserEntity currentUser = getCurrentUser();

        if (req.getUsername() != null && !req.getUsername().isEmpty() && !req.getUsername().equals(currentUser.getUsername())) {
            if (userRepository.findByUsername(req.getUsername()).isPresent()) {
                throw new RuntimeException("Tên đăng nhập đã tồn tại!");
            }
            currentUser.setUsername(req.getUsername());
        }

        if (req.getEmail() != null && !req.getEmail().isEmpty() && !req.getEmail().equals(currentUser.getEmail())) {
            if (userRepository.findByUsernameOrEmail(req.getEmail()).isPresent()) {
                throw new RuntimeException("Email đã được sử dụng bởi tài khoản khác!");
            }
            currentUser.setEmail(req.getEmail());
        }

        UserEntity savedUser = userRepository.save(currentUser);
        return toUserResponse(savedUser);
    }
}