package vn.edu.hcmuaf.fit.ThreePanthers.commons;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostFilter {
    private int pageNo = 1;
    private int pageSize = 10;
    private List<String> categoriesSlug;
    private List<String> tagsSlug;
    private Boolean isFeatured;
    private PostType type;
    private String keyword;
}
