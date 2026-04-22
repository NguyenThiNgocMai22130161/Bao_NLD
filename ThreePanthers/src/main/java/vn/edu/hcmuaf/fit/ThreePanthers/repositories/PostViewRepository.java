package vn.edu.hcmuaf.fit.ThreePanthers.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.PostViewEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.UserEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.PostEntity;
import java.util.List;
import java.util.Optional;

public interface PostViewRepository extends JpaRepository<PostViewEntity, Long> {
    Optional<PostViewEntity> findByUserAndPost(UserEntity user, PostEntity post);
    List<PostViewEntity> findByUserOrderByViewedAtDesc(UserEntity user);
}