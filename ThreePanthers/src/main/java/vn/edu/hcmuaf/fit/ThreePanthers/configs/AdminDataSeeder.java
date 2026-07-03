package vn.edu.hcmuaf.fit.ThreePanthers.configs;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserRole;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserStatus;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.UserEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.UserRepository;

@Component
@RequiredArgsConstructor
public class AdminDataSeeder implements ApplicationRunner {
    private static final Logger log = LoggerFactory.getLogger(AdminDataSeeder.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        String username = "admin";
        String email = "admin@baonld.local";
        String rawPassword = "Admin@12345";

        Optional<UserEntity> existingUser = userRepository.findByUsernameOrEmail(username);
        UserEntity admin = existingUser.orElseGet(UserEntity::new);

        admin.setUsername(username);
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(rawPassword));
        admin.setRole(UserRole.ADMIN);
        admin.setStatus(UserStatus.ACTIVE);
        admin.setVerificationCode(null);
        admin.setVerificationExpiration(null);

        userRepository.save(admin);

        log.info("Seeded admin account: username={}, email={}", username, email);
    }
}