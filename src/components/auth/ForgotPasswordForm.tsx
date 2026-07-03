import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

import { authService } from "@/services/auth.service";
import { ForgotPasswordRequest, ResetPasswordRequest } from "@/types";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

interface ValidationErrors {
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBack,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Validation helper
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate step 1
  const validateStep1 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate step 2
  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!otp.trim()) {
      newErrors.otp = "Mã OTP không được để trống";
    }

    if (!newPassword) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep1()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      const req: ForgotPasswordRequest = { email };

      await authService.forgotPassword(req);
      alert("Mã OTP đã được gửi đến email của bạn.");
      setStep(2);
    } catch (error: any) {
      console.error(error);
      
      if (error.response?.data?.details) {
        setErrors(error.response.data.details);
      } else {
        alert(error.response?.data?.message || error.message || "Không tìm thấy email trong hệ thống.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      const req: ResetPasswordRequest = {
        email,
        otp,
        newPassword,
        confirmPassword,
      };

      await authService.resetPassword(req);
      alert(
        "Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.",
      );
      onBack();
    } catch (error: any) {
      console.error(error);
      
      if (error.response?.data?.details) {
        setErrors(error.response.data.details);
      } else {
        alert(error.response?.data?.message || error.message || "Đổi mật khẩu thất bại. Kiểm tra lại mã OTP.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 1) {
    return (
      <form className="flex flex-col gap-4 mt-4" noValidate onSubmit={handleSendOtp}>
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-xl font-bold text-[#004b9a] uppercase text-center">
            Quên mật khẩu
          </h1>
          <p className="text-small text-default-500 text-center">
            Nhập email để nhận mã xác thực
          </p>
        </div>

        <Input
          isRequired
          classNames={{
            inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
          }}
          endContent={
            <EnvelopeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          errorMessage={errors.email}
          isInvalid={!!errors.email}
          label="Email"
          placeholder="Nhập email đã đăng ký"
          type="email"
          value={email}
          variant="bordered"
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors({ ...errors, email: undefined });
            }
          }}
        />

        <div className="flex flex-col gap-3 justify-end mt-4">
          <Button
            fullWidth
            className="bg-[#004b9a] font-bold text-white shadow-md"
            isLoading={isLoading}
            type="submit"
          >
            Gửi mã xác thực
          </Button>
          <Button fullWidth variant="light" onPress={onBack}>
            Quay lại đăng nhập
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form className="flex flex-col gap-4 mt-4" noValidate onSubmit={handleResetPassword}>
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="text-xl font-bold text-[#004b9a] uppercase text-center">
          Đặt lại mật khẩu
        </h1>
        <p className="text-small text-default-500 text-center">
          Nhập OTP từ email <strong>{email}</strong>
        </p>
      </div>

      <Input
        isRequired
        classNames={{
          inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
        }}
        errorMessage={errors.otp}
        isInvalid={!!errors.otp}
        label="Mã xác thực (OTP)"
        placeholder="Nhập 6 số"
        value={otp}
        variant="bordered"
        onChange={(e) => {
          setOtp(e.target.value);
          if (errors.otp) {
            setErrors({ ...errors, otp: undefined });
          }
        }}
      />

      <Input
        isRequired
        classNames={{
          inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
        }}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        errorMessage={errors.newPassword}
        isInvalid={!!errors.newPassword}
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
        type={isVisible ? "text" : "password"}
        value={newPassword}
        variant="bordered"
        onChange={(e) => {
          setNewPassword(e.target.value);
          if (errors.newPassword) {
            setErrors({ ...errors, newPassword: undefined });
          }
        }}
      />

      <Input
        isRequired
        classNames={{
          inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
        }}
        errorMessage={errors.confirmPassword}
        isInvalid={!!errors.confirmPassword}
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu mới"
        type={isVisible ? "text" : "password"}
        value={confirmPassword}
        variant="bordered"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword) {
            setErrors({ ...errors, confirmPassword: undefined });
          }
        }}
      />

      <div className="flex flex-col gap-3 justify-end mt-4">
        <Button
          fullWidth
          className="bg-[#004b9a] font-bold text-white shadow-md"
          isLoading={isLoading}
          type="submit"
        >
          Đổi mật khẩu
        </Button>
        <Button
          fullWidth
          variant="light"
          onPress={() => {
            setStep(1);
            setErrors({});
          }}
        >
          Quay lại nhập Email
        </Button>
      </div>
    </form>
  );
};
