package vn.edu.hcmuaf.fit.ThreePanthers.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponseList;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CategoryResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.services.CategoryService;

@RestController
@RequestMapping("/api/categories")
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
}
