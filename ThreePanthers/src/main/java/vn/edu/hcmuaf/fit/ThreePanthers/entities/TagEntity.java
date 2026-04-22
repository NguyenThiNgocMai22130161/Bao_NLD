package vn.edu.hcmuaf.fit.ThreePanthers.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "tbl_tags")
@Getter
public class TagEntity extends BaseEntity {
    @Column(name = "name")
    private String name;
    
    @Column(name = "slug")
    private String slug;

    @ManyToMany(mappedBy = "tags")
    private Set<PostEntity> posts = new HashSet<>();
}
