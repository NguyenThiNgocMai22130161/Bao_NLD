package vn.edu.hcmuaf.fit.ThreePanthers.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CategoryResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.CategoryEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.CategoryRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.services.CategoryService;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponseDto> getAllCate() {
        List<CategoryEntity> listEntities = categoryRepository.findAll();
        return listEntities.stream()
                .filter(e -> e.getParent() == null)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private CategoryResponseDto toResponse(CategoryEntity e) {
        CategoryResponseDto res = new CategoryResponseDto();
        res.setId(e.getId());
        res.setName(e.getName());
        res.setPosition(e.getPosition());
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
