package vn.edu.hcmuaf.fit.ThreePanthers.dtos.res;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthResponseDto {
    private String token;
    private String username;
    private String role;
}