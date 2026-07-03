package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDto {
    @NotBlank(message = "Content không được để trống")
    @Size(min = 1, max = 2000, message = "Content phải từ 1 đến 2000 ký tự")
    private String content;
    private String parentId; 
}
