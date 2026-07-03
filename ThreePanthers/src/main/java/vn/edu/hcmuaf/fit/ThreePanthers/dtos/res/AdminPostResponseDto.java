package vn.edu.hcmuaf.fit.ThreePanthers.dtos.res;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostStatus;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostType;

@Getter
@Setter
@Builder
public class AdminPostResponseDto {
    private String id;
    private String title;
    private String slug;
    private PostStatus status;
    private Boolean isFeatured;
    private PostType type;
    private String author;
    private String category;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
