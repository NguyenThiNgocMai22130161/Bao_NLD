package vn.edu.hcmuaf.fit.ThreePanthers.dtos.res;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponseDto {
    private String id;
    private String name;
    private String slug;
    private Integer position;
    private List<CategoryResponseDto> children = new ArrayList<>();
}
