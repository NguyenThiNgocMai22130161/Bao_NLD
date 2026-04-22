package vn.edu.hcmuaf.fit.ThreePanthers.services;

import vn.edu.hcmuaf.fit.ThreePanthers.commons.PageResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostFilter;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.PostDetailResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.PostSummaryResponseDto;

public interface PostService {
    PostDetailResponseDto getPostDetail(String slug);
    PageResponse<PostSummaryResponseDto> getPost(PostFilter filter);
}
