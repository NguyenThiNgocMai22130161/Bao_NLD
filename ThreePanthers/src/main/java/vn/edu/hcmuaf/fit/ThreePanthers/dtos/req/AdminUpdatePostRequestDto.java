package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostStatus;

@Getter
@Setter
public class AdminUpdatePostRequestDto {
    @NotNull(message = "Status không được để trống")
    private PostStatus status;

    @NotNull(message = "isFeatured không được để trống")
    private Boolean isFeatured;
}
