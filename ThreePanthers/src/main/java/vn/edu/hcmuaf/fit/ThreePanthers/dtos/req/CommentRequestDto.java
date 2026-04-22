package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDto {
    private String content;
    private String parentId; 
}