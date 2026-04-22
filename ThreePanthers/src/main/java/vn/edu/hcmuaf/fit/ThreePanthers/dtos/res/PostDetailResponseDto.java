package vn.edu.hcmuaf.fit.ThreePanthers.dtos.res;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDetailResponseDto extends PostSummaryResponseDto {
    private List<PostSummaryResponseDto> relatedPosts = new ArrayList<>();
}
