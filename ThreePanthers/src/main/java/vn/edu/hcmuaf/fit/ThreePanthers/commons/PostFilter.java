package vn.edu.hcmuaf.fit.ThreePanthers.commons;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

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

    private String publishDate;
}
