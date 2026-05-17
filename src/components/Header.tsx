import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar, Button } from "@heroui/react";

import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const menuItems = [
    { name: "THỜI SỰ", path: "/thoi-su" },
    { name: "QUỐC TẾ", path: "/quoc-te" },
    { name: "LAO ĐỘNG", path: "/lao-dong" },
    { name: "BẠN ĐỌC", path: "/ban-doc" },
    { name: "KINH TẾ", path: "/kinh-te" },
    { name: "SỨC KHỎE", path: "/suc-khoe" },
    { name: "GIÁO DỤC", path: "/giao-duc" },
    { name: "PHÁP LUẬT", path: "/phap-luat" },
    { name: "VĂN HÓA - VĂN NGHỆ", path: "/van-hoa-van-nghe" },
    { name: "GIẢI TRÍ", path: "/giai-tri" },
    { name: "THỂ THAO", path: "/the-thao" },
    { name: "AI 365", path: "/ai-365" },
    { name: "DU LỊCH XANH", path: "/du-lich-xanh" },
    { name: "PHỤ NỮ", path: "/phu-nu" },
    { name: "GIA ĐÌNH", path: "/gia-dinh" },
    { name: "ĐỊA ỐC", path: "/dia-oc" },
  ];

  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full">
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto w-full flex flex-wrap items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link className="flex items-center" to="/">
              <h1 className="text-[#d80f1e] font-black text-4xl sm:text-5xl tracking-tighter uppercase font-sans">
                NGƯỜI LAO ĐỘNG
              </h1>
            </Link>
            <div className="hidden lg:flex flex-col border-l border-gray-300 pl-4 gap-1">
              <span className="text-xs font-bold text-blue-800">
                NGƯỜI LAO ĐỘNG News
              </span>
              <span className="text-sm text-gray-500 font-medium capitalize">
                {today}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <div className="relative hidden md:block">
              <input
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 w-48 lg:w-64"
                placeholder="Tìm kiếm"
                type="text"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {isLoggedIn ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    classNames={{
                      base: "bg-[#004b9a] text-white ring-[#004b9a]",
                    }}
                    color="primary"
                    name={user?.username}
                    size="sm"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Xin chào,</p>
                    <p className="font-semibold text-[#004b9a] uppercase">
                      {user?.username}
                    </p>
                  </DropdownItem>
                  <DropdownItem key="user_profile" href="/profile">
                    Hồ sơ cá nhân
                  </DropdownItem>
                  <DropdownItem key="history" href="/history">
                    Lịch sử xem
                  </DropdownItem>
                  <DropdownItem key="saved" href="/saved">
                    Tin đã lưu
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={handleLogout}
                  >
                    Đăng xuất
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                className="bg-[#004b9a] text-white font-bold"
                radius="full"
                size="md"
                onPress={() => navigate("/auth")}
              >
                Đăng nhập
              </Button>
            )}

            <button className="hidden sm:flex items-center gap-2 bg-[#2d87f0] hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors">
              Đăng ký gói bạn đọc VIP
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-[#d80f1e] hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors">
              E-paper
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#004b9a] text-white w-full border-t border-blue-800">
        <div className="container mx-auto px-4">
          <ul className="flex items-center whitespace-nowrap overflow-hidden">
            <li className="flex-shrink-0">
              <Link
                className="flex items-center px-2 py-2 hover:bg-blue-700 transition-colors"
                to="/"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.632 8.632a.75.75 0 01-1.06 1.06l-.352-.352V20.25a.75.75 0 01-.75.75h-3.375a.75.75 0 01-.75-.75V14.25H9.125v6a.75.75 0 01-.75.75H5a.75.75 0 01-.75-.75v-7.07l-.352.352a.75.75 0 01-1.06-1.06L11.47 3.84z" />
                </svg>
              </Link>
            </li>

            {/* Menu */}
            {menuItems.map((item) => (
              <li key={item.name} className="flex-shrink-0">
                <Link
                  className="flex items-center px-2 py-2 text-[12px] font-semibold uppercase hover:bg-blue-700 transition-colors"
                  to={item.path}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li className="ml-auto flex items-center justify-center px-2 py-2 cursor-pointer hover:bg-blue-700 flex-shrink-0">
              <span className="text-xl font-bold pb-2">...</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
