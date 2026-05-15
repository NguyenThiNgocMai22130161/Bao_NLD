import { useState } from "react";
import { Input, Button, Link } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

import { authService } from "@/services/auth.service";
import { LoginRequest } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onForgotPassword: () => void;
}
export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.login(loginData);

      setAuthData(res.data);
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Đăng nhập thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="text-xl font-bold text-[#004b9a] uppercase text-center">
          Chào mừng trở lại
        </h1>
        <p className="text-small text-default-500 text-center">
          Đăng nhập để theo dõi tin tức mới nhất
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
        label="Email hoặc Tên đăng nhập"
        placeholder="Nhập email/username"
        type="text"
        value={loginData.identifier}
        variant="bordered"
        onChange={(e) =>
          setLoginData({ ...loginData, identifier: e.target.value })
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
        placeholder="Nhập mật khẩu"
        type={isVisible ? "text" : "password"}
        value={loginData.password}
        variant="bordered"
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
      />
      <div className="flex justify-center px-1">
        <Link
          className="text-[#004b9a]"
          color="primary"
          size="sm"
          onPress={onForgotPassword}
        >
          Quên mật khẩu?
        </Link>
      </div>
      <div className="flex gap-2 justify-center ">
        <Button
          fullWidth
          className="bg-[#004b9a] font-bold text-white shadow-md"
          isLoading={isLoading}
          type="submit"
        >
          {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
        </Button>
      </div>
    </form>
  );
};
