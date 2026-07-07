package vn.edu.hcmuaf.fit.ThreePanthers.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Async 
    public void sendWelcomeEmail(String toEmail, String username) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Chào mừng đến với ThreePanthers!");
        message.setText("Xin chào " + username + ",\n\nCảm ơn bạn đã đăng ký tài khoản thành công.\nChúc bạn có những trải nghiệm tuyệt vời!");
        
        mailSender.send(message);
    }

    @Async
    public void sendVerificationEmail(String toEmail, String username, String code) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("ntngocmaigl@gmail.com"); // ← Thêm from address
            message.setTo(toEmail);
            message.setSubject("Xác thực tài khoản ThreePanthers");
            message.setText("Xin chào " + username + ",\n\n"
                    + "Mã xác thực tài khoản của bạn là: " + code + "\n"
                    + "Mã này sẽ hết hạn sau 24 giờ.\n\n"
                    + "Trân trọng,");
            
            mailSender.send(message);
            System.out.println("✅ Email verification đã gửi thành công đến: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Lỗi gửi email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Async
    public void sendForgotPasswordEmail(String toEmail, String username, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("ntngocmaigl@gmail.com");
            message.setTo(toEmail);
            message.setSubject("Yêu cầu đặt lại mật khẩu - ThreePanthers");
            message.setText("Xin chào " + username + ",\n\n"
                    + "Bạn vừa yêu cầu đặt lại mật khẩu. Mã xác thực (OTP) của bạn là: " + otp + "\n"
                    + "Mã này sẽ hết hạn sau 24 giờ.\n"
                    + "Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này.\n\n"
                    + "Trân trọng,");
            
            mailSender.send(message);
            System.out.println("✅ Email reset password đã gửi thành công đến: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Lỗi gửi email reset password: " + e.getMessage());
            e.printStackTrace();
        }
    }
}