package vn.edu.hcmuaf.fit.ThreePanthers.commons;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SuccessResponseList<T> {
    private int status;
    private String message;
    private List<T> data;
}
