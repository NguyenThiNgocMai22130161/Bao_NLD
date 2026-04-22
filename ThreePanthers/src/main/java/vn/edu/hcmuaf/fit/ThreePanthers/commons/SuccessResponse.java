package vn.edu.hcmuaf.fit.ThreePanthers.commons;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SuccessResponse<T> {
    private int status;
    private String message;
    private T data;
}
