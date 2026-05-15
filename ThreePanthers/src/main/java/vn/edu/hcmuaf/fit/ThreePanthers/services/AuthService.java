package vn.edu.hcmuaf.fit.ThreePanthers.services;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserRole;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserStatus;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.ChangePasswordRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.ForgotPasswordRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.LoginRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.RegisterRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.ResetPasswordRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.VerifyRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AuthResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.UserEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.UserRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.JwtUtils;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public void register(RegisterRequestDto req) { 
        if (userRepository.findByUsernameOrEmail(req.getUsername()).isPresent() 
            || userRepository.findByUsernameOrEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Username hoặc Email đã tồn tại");
        }
        
        UserEntity user = new UserEntity();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(UserRole.USER);
        user.setStatus(UserStatus.INACTIVE); 

        String code = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setVerificationCode(code);
        user.setVerificationExpiration(LocalDateTime.now().plusMinutes(15)); 

        userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), user.getUsername(), code);
    }

    public void verifyAccount(VerifyRequestDto req) {
        UserEntity user = userRepository.findByUsernameOrEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        if (user.getVerificationExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Mã xác thực đã hết hạn");
        }

        if (user.getVerificationCode().equals(req.getVerificationCode())) {
            user.setStatus(UserStatus.ACTIVE); 
            user.setVerificationCode(null);
            user.setVerificationExpiration(null);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Mã xác thực không chính xác");
        }
    }

   public AuthResponseDto login(LoginRequestDto req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getIdentifier(), req.getPassword())
        );

        UserEntity user = userRepository.findByUsernameOrEmail(req.getIdentifier())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateToken(user);
        
        return AuthResponseDto.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();
    }

    public void changePassword(String currentUsername, ChangePasswordRequestDto req) {
        UserEntity user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Mật khẩu cũ không chính xác");
        }

        if (!req.getNewPassword().equals(req.getConfirmPassword())) {
            throw new RuntimeException("Mật khẩu xác nhận không khớp");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);
    }

    public void forgotPassword(ForgotPasswordRequestDto req) {
        UserEntity user = userRepository.findByUsernameOrEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không tồn tại trong hệ thống"));

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        user.setVerificationCode(otp);
        user.setVerificationExpiration(LocalDateTime.now().plusMinutes(15));
        
        userRepository.save(user);

        emailService.sendForgotPasswordEmail(user.getEmail(), user.getUsername(), otp);
    }

    public void resetPassword(ResetPasswordRequestDto req) {
        UserEntity user = userRepository.findByUsernameOrEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User không tìm thấy"));

        if (user.getVerificationExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Mã xác thực đã hết hạn");
        }
        if (!user.getVerificationCode().equals(req.getOtp())) {
            throw new RuntimeException("Mã xác thực không chính xác");
        }

        if (!req.getNewPassword().equals(req.getConfirmPassword())) {
            throw new RuntimeException("Mật khẩu xác nhận không khớp");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        user.setVerificationCode(null);
        user.setVerificationExpiration(null);
        userRepository.save(user);
    }
}