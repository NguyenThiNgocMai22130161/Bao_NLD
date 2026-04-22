package vn.edu.hcmuaf.fit.ThreePanthers.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, String> {
    List<CommentEntity> findByPostIdAndParentIsNull(String postId, Sort sort);
    List<CommentEntity> findByUserId(String userId, Sort sort);
}