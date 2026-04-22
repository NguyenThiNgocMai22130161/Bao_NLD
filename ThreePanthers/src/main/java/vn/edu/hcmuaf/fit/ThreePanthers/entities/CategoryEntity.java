package vn.edu.hcmuaf.fit.ThreePanthers.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_categories")
@Getter
@Setter
public class CategoryEntity extends BaseEntity{
    @Column(name = "name")
    private String name;

    @Column(name = "slug")
    private String slug;

    @Column(name = "position")
    private Integer position;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private CategoryEntity parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<CategoryEntity> children = new ArrayList<CategoryEntity>();


    @OneToMany(mappedBy = "category")
    private Set<PostEntity> posts = new HashSet<>();
}
