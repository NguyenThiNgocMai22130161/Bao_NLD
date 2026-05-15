import { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { useLocation } from "react-router-dom";

import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function AuthPage() {
  const [selected, setSelected] = useState<React.Key>("login");
  const location = useLocation();
  const [view, setView] = useState<"auth" | "forgot">("auth");

  useEffect(() => {
    if (location.state && location.state.tab) {
      setSelected(location.state.tab);
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-200px)] items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-full w-[400px] h-auto shadow-lg">
        <CardBody className="overflow-hidden">
          {view === "forgot" ? (
            <ForgotPasswordForm onBack={() => setView("auth")} />
          ) : (
            <Tabs
              fullWidth
              aria-label="Tabs form"
              classNames={{
                cursor: "bg-[#004b9a]",
                tabContent: "group-data-[selected=true]:text-white font-bold",
              }}
              color="primary"
              selectedKey={selected as string}
              size="md"
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Đăng Nhập">
                <LoginForm onForgotPassword={() => setView("forgot")} />
              </Tab>
              <Tab key="register" title="Đăng Ký">
                <RegisterForm onSuccess={() => setSelected("login")} />
              </Tab>
            </Tabs>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
