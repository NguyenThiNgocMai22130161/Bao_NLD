package vn.edu.hcmuaf.fit.ThreePanthers.dtos.res;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.CategoryEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.TagEntity;

@Getter
@Setter
public class PostSummaryResponseDto {
    private String id;
    private String title;
    private String summary;
    private String content;
    private String thumbnail;
    private LocalDateTime publishedAt;
    private Integer viewCount;
    private Boolean isFeatured;
    private String author;
    private CategoryResponseDto category;
    private List<TagResponseDto> tags = new ArrayList<>();


    public void setTags(Set<TagEntity> e) {
        for (TagEntity tagEntity : e) {
            TagResponseDto res = new TagResponseDto();
            res.setName(tagEntity.getName());
            res.setId(tagEntity.getId());
            res.setSlug(tagEntity.getSlug());
            this.tags.add(res);
        }
    }

   public void setCategory(CategoryEntity e){
    if (e == null) {
        this.category = null;
        return;
    }

    CategoryResponseDto res = new CategoryResponseDto();
    res.setId(e.getId());
    res.setName(e.getName());
    res.setSlug(e.getSlug());
    res.setPosition(e.getPosition());
    this.category = res;
}
}
