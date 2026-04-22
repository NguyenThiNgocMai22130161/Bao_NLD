package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {
    private String identifier;
    private String password;
}