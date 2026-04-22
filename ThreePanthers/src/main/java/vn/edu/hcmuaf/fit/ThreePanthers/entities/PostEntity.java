package vn.edu.hcmuaf.fit.ThreePanthers.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostStatus;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostType;

@Entity
@Table(name = "tbl_posts")
@Getter
public class PostEntity extends BaseEntity {
    @Column(name = "title")
    private String title;

    @Column(name = "slug", unique = true)
    private String slug;

    @Column(name = "summary", columnDefinition = "TEXT")
    private String summary;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PostStatus status;

    @Column(name = "view_count")
    private Integer viewCount;

    @Column(name = "is_featured")
    private Boolean isFeatured;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private PostType type;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private UserEntity author;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private CategoryEntity category;

    @ManyToMany
    @JoinTable(name = "tbl_post_tags", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<TagEntity> tags = new HashSet<>();

    @OneToMany(mappedBy = "post")
    private Set<CommentEntity> comments = new HashSet<>();

    @PrePersist
    private void onCreate() {
        if (status == null)
            status = PostStatus.DRAFT;
        if (viewCount == null)
            viewCount = 0;
        if (type == null)
            type = PostType.STANDARD;
    }
}
