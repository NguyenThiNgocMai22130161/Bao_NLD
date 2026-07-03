import { useState } from "react";
import { Input, Button, Link } from "@heroui/react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

import { authService } from "@/services/auth.service";
import { RegisterRequest, VerifyRequest } from "@/types";

interface RegisterFormProps {
  onSuccess: () => void;
}

interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otpCode, setOtpCode] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Validation helpers
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Client-side validation for register
  const validateRegisterForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!registerData.username.trim()) {
      newErrors.username = "Tên đăng nhập không được để trống";
    } else if (registerData.username.length < 3 || registerData.username.length > 50) {
      newErrors.username = "Tên đăng nhập phải từ 3 đến 50 ký tự";
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!validateEmail(registerData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!registerData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Client-side validation for verify
  const validateVerifyForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!otpCode.trim()) {
      newErrors.verificationCode = "Mã xác thực không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      const req: RegisterRequest = {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      };

      await authService.register(req);
      setIsVerifying(true);
      alert("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
    } catch (error: any) {
      console.error(error);
      
      if (error.response?.data?.details) {
        setErrors(error.response.data.details);
      } else {
        alert(error.response?.data?.message || error.message || "Đăng ký thất bại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateVerifyForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      const req: VerifyRequest = {
        email: registerData.email,
        verificationCode: otpCode,
      };

      await authService.verify(req);
      alert("Xác thực thành công! Vui lòng đăng nhập.");

      setRegisterData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setOtpCode("");
      setIsVerifying(false);

      onSuccess();
    } catch (error: any) {
      console.error(error);
      
      if (error.response?.data?.details) {
        setErrors(error.response.data.details);
      } else {
        alert(error.response?.data?.message || error.message || "Mã xác thực không đúng.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <form className="flex flex-col gap-4 mt-4" noValidate onSubmit={handleVerify}>
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-xl font-bold text-[#004b9a] uppercase text-center">
            Xác thực tài khoản
          </h1>
          <p className="text-small text-default-500 text-center">
            Vui lòng nhập mã OTP đã được gửi đến email: <strong>{registerData.email}</strong>
          </p>
        </div>

        <div className="flex flex-col gap-4 my-2">
          <Input
            isRequired
            classNames={{
              inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
            }}
            errorMessage={errors.verificationCode}
            isInvalid={!!errors.verificationCode}
            label="Mã xác thực (OTP)"
            placeholder="Nhập 6 số từ email"
            value={otpCode}
            variant="bordered"
            onChange={(e) => {
              setOtpCode(e.target.value);
              if (errors.verificationCode) {
                setErrors({ ...errors, verificationCode: undefined });
              }
            }}
          />
        </div>

        <div className="flex flex-col gap-2 justify-end mt-auto">
          <Button
            fullWidth
            className="bg-[#004b9a] font-bold text-white shadow-md"
            isLoading={isLoading}
            type="submit"
          >
            Xác Nhận
          </Button>
          <Button
            fullWidth
            className="text-default-500"
            variant="light"
            onPress={() => {
              setIsVerifying(false);
              setErrors({});
            }}
          >
            Quay lại đăng ký
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form className="flex flex-col gap-4 mt-4" noValidate onSubmit={handleRegister}>
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="text-xl font-bold text-[#004b9a] uppercase text-center">
          Tạo tài khoản mới
        </h1>
        <p className="text-small text-default-500 text-center">
          Tham gia cùng cộng đồng độc giả
        </p>
      </div>

      <Input
        isRequired
        classNames={{
          inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
        }}
        errorMessage={errors.username}
        isInvalid={!!errors.username}
        label="Tên đăng nhập"
        placeholder="Chọn tên hiển thị (3-50 ký tự)"
        type="text"
        value={registerData.username}
        variant="bordered"
        onChange={(e) => {
          setRegisterData({
            ...registerData,
            username: e.target.value,
          });
          if (errors.username) {
            setErrors({ ...errors, username: undefined });
          }
        }}
      />
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
        placeholder="Nhập email của bạn"
        type="email"
        value={registerData.email}
        variant="bordered"
        onChange={(e) => {
          setRegisterData({ ...registerData, email: e.target.value });
          if (errors.email) {
            setErrors({ ...errors, email: undefined });
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
        errorMessage={errors.password}
        isInvalid={!!errors.password}
        label="Mật khẩu"
        placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
        type={isVisible ? "text" : "password"}
        value={registerData.password}
        variant="bordered"
        onChange={(e) => {
          setRegisterData({
            ...registerData,
            password: e.target.value,
          });
          if (errors.password) {
            setErrors({ ...errors, password: undefined });
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
        placeholder="Nhập lại mật khẩu"
        type={isVisible ? "text" : "password"}
        value={registerData.confirmPassword}
        variant="bordered"
        onChange={(e) => {
          setRegisterData({
            ...registerData,
            confirmPassword: e.target.value,
          });
          if (errors.confirmPassword) {
            setErrors({ ...errors, confirmPassword: undefined });
          }
        }}
      />
      <div className="flex gap-2 flex-col justify-end mt-4">
        <Button
          fullWidth
          className="bg-[#004b9a] font-bold text-white shadow-md"
          isLoading={isLoading}
          type="submit"
        >
          {isLoading ? "Đang xử lý..." : "Đăng Ký"}
        </Button>
        <div className="flex justify-center">
          <Link
            className="cursor-pointer text-xs text-[#004b9a]"
            onPress={() => {
              setIsVerifying(true);
              setErrors({});
            }}
          >
            Bạn đã có mã xác thực? Nhập ngay
          </Link>
        </div>
      </div>
    </form>
  );
};
