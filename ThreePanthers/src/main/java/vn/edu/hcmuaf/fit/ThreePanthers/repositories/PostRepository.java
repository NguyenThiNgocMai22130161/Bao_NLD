package vn.edu.hcmuaf.fit.ThreePanthers.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostStatus;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.CategoryEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.PostEntity;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, String>, JpaSpecificationExecutor<PostEntity> {

    PostEntity findBySlug(String slug);

    @Override
    @EntityGraph(attributePaths = {"category", "author"}) 
    Page<PostEntity> findAll(Specification<PostEntity> spec, Pageable pageable);

    // - null content)
    Page<PostEntity> findAllByContentIsNotNull(Pageable pageable);
    
    // List<PostEntity> findTop5ByCategoryAndStatusAndIdNotOrderByPublishedAtDesc(
    //     CategoryEntity category, 
    //     PostStatus status, 
    //     String id
    // );

    @Query("SELECT p FROM PostEntity p WHERE p.category = ?1 AND p.status = ?2 AND p.id <> ?3 AND p.content IS NOT NULL ORDER BY p.publishedAt DESC")
    List<PostEntity> findTop5ByCategoryAndStatusAndIdNotOrderByPublishedAtDesc(
        CategoryEntity category, PostStatus status, String id);
}
