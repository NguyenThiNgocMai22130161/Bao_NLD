package vn.edu.hcmuaf.fit.ThreePanthers.commons;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PageResponse <T> {
    private int currentPage;
    private long totalElements;
    private int totalPages;
    private List<T> items;
}
