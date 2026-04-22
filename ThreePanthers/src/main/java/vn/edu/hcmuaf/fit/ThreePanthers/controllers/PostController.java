package vn.edu.hcmuaf.fit.ThreePanthers.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PageResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostFilter;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.PostDetailResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.PostSummaryResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.services.PostService;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping("/{slug}")
    public SuccessResponse<PostDetailResponseDto> getPostDetail(@PathVariable("slug") String slug){
        return SuccessResponse.<PostDetailResponseDto>builder()
        .status(200)
        .message("Lấy chi tiết bài viest thành công")
        .data(postService.getPostDetail(slug))
        .build();
    }

    @PostMapping()
    public SuccessResponse<PageResponse<PostSummaryResponseDto>> getPosts(@RequestBody PostFilter filter){
        PageResponse<PostSummaryResponseDto> pageData = postService.getPost(filter);
        
        return SuccessResponse.<PageResponse<PostSummaryResponseDto>>builder()
                .status(200)
                .message("Lấy danh sách bài viết thành công")
                .data(pageData)
                .build();
    }
}
