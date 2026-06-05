package vn.edu.hcmuaf.fit.ThreePanthers.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponseList;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CategoryDetailResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CategoryResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.services.CategoryService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping()
    public SuccessResponseList<CategoryResponseDto> getAllCate() {
        return SuccessResponseList.<CategoryResponseDto>builder()
        .status(200)
        .message("lấy danh mục thành công!")
        .data(categoryService.getAllCate())
        .build();
    }

    @GetMapping("/{slug}")
    public SuccessResponse<CategoryResponseDto> getCategoryBySlug(@PathVariable("slug") String slug) {
        return SuccessResponse.<CategoryResponseDto>builder()
                .status(200)
                .message("Lấy chi tiết danh mục thành công")
                .data(categoryService.getCategoryBySlug(slug))
                .build();
    }

    @GetMapping("/{slug}/detail")
    public SuccessResponse<CategoryDetailResponseDto> getCategoryDetailBySlug(
            @PathVariable("slug") String slug,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return SuccessResponse.<CategoryDetailResponseDto>builder()
                .status(200)
                .message("Lấy chi tiết danh mục và danh sách bài viết thành công")
                .data(categoryService.getCategoryDetailBySlug(slug, page, size))
                .build();
    }


}