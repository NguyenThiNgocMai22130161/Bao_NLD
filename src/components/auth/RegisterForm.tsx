import { useState } from "react";
import { Input, Button, Link } from "@heroui/react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

import { authService } from "@/services/auth.service";
import { RegisterRequest, VerifyRequest } from "@/types";

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [verifyEmail, setVerifyEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");

      return;
    }
    setIsLoading(true);
    try {
      const req: RegisterRequest = {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      };

      await authService.register(req);
      setIsVerifying(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Đăng ký thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
      alert(error.message || "Mã xác thực không đúng.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleVerify}>
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-xl font-bold text-[#004b9a] uppercase text-center">
            Xác thực tài khoản
          </h1>
          <p className="text-small text-default-500 text-center">
            Vui lòng nhập mã OTP đã được gửi đến email
          </p>
        </div>

        <div className="flex flex-col gap-4 my-2">
          <Input
            isRequired
            classNames={{
              inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
            }}
            endContent={
              <EnvelopeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email xác thực"
            placeholder="Nhập email của bạn"
            value={verifyEmail}
            variant="bordered"
            onChange={(e) => setVerifyEmail(e.target.value)}
          />

          <Input
            isRequired
            classNames={{
              inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
            }}
            label="Mã xác thực (OTP)"
            placeholder="Nhập 6 số từ email"
            value={otpCode}
            variant="bordered"
            onChange={(e) => setOtpCode(e.target.value)}
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
            onPress={() => setIsVerifying(false)}
          >
            Quay lại đăng ký
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form className="flex flex-col gap-4 mt-4 " onSubmit={handleRegister}>
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
        label="Tên đăng nhập"
        placeholder="Chọn tên hiển thị"
        type="text"
        value={registerData.username}
        variant="bordered"
        onChange={(e) =>
          setRegisterData({
            ...registerData,
            username: e.target.value,
          })
        }
      />
      <Input
        isRequired
        classNames={{
          inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
        }}
        endContent={
          <EnvelopeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Email"
        placeholder="Nhập email của bạn"
        type="email"
        value={registerData.email}
        variant="bordered"
        onChange={(e) =>
          setRegisterData({ ...registerData, email: e.target.value })
        }
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
        label="Mật khẩu"
        placeholder="Tạo mật khẩu"
        type={isVisible ? "text" : "password"}
        value={registerData.password}
        variant="bordered"
        onChange={(e) =>
          setRegisterData({
            ...registerData,
            password: e.target.value,
          })
        }
      />
      <Input
        isRequired
        classNames={{
          inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
        }}
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        type={isVisible ? "text" : "password"}
        value={registerData.confirmPassword}
        variant="bordered"
        onChange={(e) =>
          setRegisterData({
            ...registerData,
            confirmPassword: e.target.value,
          })
        }
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
            onPress={() => setIsVerifying(true)}
          >
            Bạn đã có mã xác thực? Nhập ngay
          </Link>
        </div>
      </div>
    </form>
  );
};
