package vn.edu.hcmuaf.fit.ThreePanthers.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param; 

import vn.edu.hcmuaf.fit.ThreePanthers.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    
    @Query("SELECT u FROM UserEntity u WHERE u.username = :identifier OR u.email = :identifier")
    Optional<UserEntity> findByUsernameOrEmail(@Param("identifier") String identifier);
    
    Optional<UserEntity> findByUsername(String username);
}