package vn.edu.hcmuaf.fit.ThreePanthers.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.CommentRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CommentResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.CommentEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.PostEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.UserEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.exeptions.ResourceNotFoundException;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.CommentRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.PostRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.UserRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.services.CommentService;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByPost(String postId) {
        List<CommentEntity> rootComments = commentRepository.findByPostIdAndParentIsNull(
            postId, 
            Sort.by(Sort.Direction.DESC, "createdAt")
        );
        return rootComments.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CommentResponseDto createComment(String postId, CommentRequestDto req) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Bài viết không tồn tại"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
             throw new RuntimeException("Bạn cần đăng nhập để thực hiện chức năng này");
        }

        String currentUsername = authentication.getName();
        
        UserEntity user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User không tồn tại trong hệ thống"));

        // 3. Tạo Entity
        CommentEntity comment = new CommentEntity();
        comment.setContent(req.getContent());
        comment.setPost(post);
        comment.setUser(user);

        if (req.getParentId() != null) {
            CommentEntity parent = commentRepository.findById(req.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Comment cha không tồn tại"));
            
            if (!parent.getPost().getId().equals(postId)) {
                throw new IllegalArgumentException("Comment cha không thuộc bài viết này");
            }
            comment.setParent(parent);
        }

        CommentEntity saved = commentRepository.save(comment);
        return mapToDto(saved);
    }

    private CommentResponseDto mapToDto(CommentEntity entity) {
        CommentResponseDto dto = new CommentResponseDto();
        dto.setId(entity.getId());
        dto.setContent(entity.getContent());
        dto.setCreatedAt(entity.getCreatedAt());

        if (entity.getUser() != null) {
            dto.setUser(entity.getUser().getUsername());
        }

        if (entity.getReplies() != null && !entity.getReplies().isEmpty()) {
            List<CommentResponseDto> replyDtos = entity.getReplies().stream()
                    .sorted((c1, c2) -> c1.getCreatedAt().compareTo(c2.getCreatedAt())) // ASC
                    .map(this::mapToDto) 
                    .collect(Collectors.toList());
            dto.setReplies(replyDtos);
        }

        return dto;
    }
}