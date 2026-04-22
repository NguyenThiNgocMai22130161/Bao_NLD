package vn.edu.hcmuaf.fit.ThreePanthers.dtos.res;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResponseDto {
    private String id;
    private String content;
    private LocalDateTime createdAt;
    private String user; 
    private String postSlug;
    private String postTitle;
    private List<CommentResponseDto> replies = new ArrayList<>();
}