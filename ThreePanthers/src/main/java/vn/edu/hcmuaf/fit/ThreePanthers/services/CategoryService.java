package vn.edu.hcmuaf.fit.ThreePanthers.services;

import java.util.List;

import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CategoryDetailResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CategoryResponseDto;

public interface CategoryService {
     List<CategoryResponseDto> getAllCate();

     CategoryResponseDto getCategoryBySlug(String slug);

     CategoryDetailResponseDto getCategoryDetailBySlug(String slug, int page, int size);
}
