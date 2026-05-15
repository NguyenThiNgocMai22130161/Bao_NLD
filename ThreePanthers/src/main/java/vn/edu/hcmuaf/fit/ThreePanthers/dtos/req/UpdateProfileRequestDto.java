package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequestDto {
    private String username;
    private String email;
}