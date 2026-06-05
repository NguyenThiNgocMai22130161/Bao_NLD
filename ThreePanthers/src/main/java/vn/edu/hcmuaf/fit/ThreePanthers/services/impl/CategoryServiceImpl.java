package vn.edu.hcmuaf.fit.ThreePanthers.services.impl;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostFilter;
import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CategoryDetailResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CategoryResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.CategoryEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.exeptions.ResourceNotFoundException;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.CategoryRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.services.CategoryService;
import vn.edu.hcmuaf.fit.ThreePanthers.services.PostService;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;
    private final PostService postService;

    @Override
    public List<CategoryResponseDto> getAllCate() {
        List<CategoryEntity> listEntities = categoryRepository.findAll();
        return listEntities.stream()
                .filter(e -> e.getParent() == null)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDto getCategoryBySlug(String slug) {
        CategoryEntity category = categoryRepository.findBySlug(slug);
        if (category == null) {
            throw new ResourceNotFoundException("Không tìm thấy danh mục");
        }
        return toResponse(category);
    }

    @Override
    public CategoryDetailResponseDto getCategoryDetailBySlug(String slug, int page, int size) {
        CategoryEntity category = categoryRepository.findBySlug(slug);
        if (category == null) {
            throw new ResourceNotFoundException("Không tìm thấy danh mục");
        }

        PostFilter filter = new PostFilter();
        filter.setPageNo(page);
        filter.setPageSize(size);
        filter.setCategoriesSlug(Collections.singletonList(slug));

        CategoryDetailResponseDto response = new CategoryDetailResponseDto();
        response.setCategory(toResponse(category));
        response.setPosts(postService.getPost(filter));
        return response;
    }

    private CategoryResponseDto toResponse(CategoryEntity e) {
        CategoryResponseDto res = new CategoryResponseDto();
        res.setId(e.getId());
        res.setName(e.getName());
        res.setPosition(e.getPosition() == null ? 0 : e.getPosition());
        res.setSlug(e.getSlug());

        if (e.getChildren() != null && !e.getChildren().isEmpty()) {
            List<CategoryResponseDto> childrenDto = e.getChildren().stream()
                    .map(this::toResponse)
                    .collect(Collectors.toList());
            res.setChildren(childrenDto);
        }
        
        return res;
    }
    
}
