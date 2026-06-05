package vn.edu.hcmuaf.fit.ThreePanthers.dtos.res;

import lombok.Getter;
import lombok.Setter;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PageResponse;

@Getter
@Setter
public class CategoryDetailResponseDto {
    private CategoryResponseDto category;
    private PageResponse<PostSummaryResponseDto> posts;
}
