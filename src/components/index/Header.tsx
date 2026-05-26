import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar, Button } from "@heroui/react";
import {
  HomeIcon,
  PlayIcon,
  PhotoIcon,
  DocumentTextIcon,
  ChartBarIcon,
  LightBulbIcon,
  MegaphoneIcon,
  StarIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  BuildingOffice2Icon,
  RectangleGroupIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FaFacebookF, FaYoutube, FaRss } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

import { useAuth } from "@/contexts/AuthContext";

/* ------------------ utils ------------------ */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

/* ------------------ component ------------------ */
const Header = () => {
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  /* -------- search -------- */
  const executeSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowMegaMenu(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") executeSearch();
  };

  /* -------- main menu -------- */
  const menuItems = [
    { label: "THỜI SỰ", slug: "thoi-su" },
    { label: "QUỐC TẾ", slug: "quoc-te" },
    { label: "LAO ĐỘNG", slug: "lao-dong" },
    { label: "BẠN ĐỌC", slug: "ban-doc" },
    { label: "NET ZERO", slug: "net-zero" },
    { label: "KINH TẾ", slug: "kinh-te" },
    { label: "SỨC KHỎE", slug: "suc-khoe" },
    { label: "GIÁO DỤC", slug: "giao-duc" },
    { label: "PHÁP LUẬT", slug: "phap-luat" },
    { label: "VĂN HÓA - VĂN NGHỆ", slug: "van-hoa-van-nghe" },
    { label: "GIẢI TRÍ", slug: "giai-tri" },
    { label: "THỂ THAO", slug: "the-thao" },
    { label: "AI 365", slug: "ai-365" },
    { label: "PHỤ NỮ", slug: "phu-nu" },
    { label: "GIA ĐÌNH", slug: "gia-dinh" },
    { label: "ĐỊA ỐC", slug: "dia-oc" },
  ];

  /* -------- mega menu -------- */
  const primaryMenus = [
    { title: "Thời sự", items: ["Chính trị", "Xã hội", "Đô thị"] },
    { title: "Quốc tế", items: ["Người Việt đó đây", "Hay - lạ", "Vấn đề nóng"] },
    { title: "Lao động", items: ["Công đoàn - Công nhân", "Việc làm", "An sinh xã hội"] },
    { title: "Bạn đọc", items: ["Cuộc sống nhân ái", "Tôi lên tiếng", "Góc ảnh bạn đọc"] },
    { title: "Net Zero", items: ["Tin tức & Xu hướng", "Chuyển đổi xanh", "Sống xanh", "Cẩm nang"] },
    { title: "Kinh tế", items: ["Kinh doanh", "Tiêu dùng", "Ôtô - Xe - Điện máy", "Bất động sản", "Tài chính-Chứng khoán"] },
    { title: "Sức khỏe", items: ["Chuyển động y học", "Giới tính", "Bác sĩ của bạn", "Khỏe và đẹp"] },
    { title: "Giáo dục", items: ["Du học", "Tuyển sinh", "Sau bục giảng"] },
    { title: "Pháp luật", items: ["Luật sư của bạn", "Truy nã", "Chuyện pháp đình"] },
    { title: "Văn hóa - Văn nghệ", items: ["Âm nhạc", "Văn học", "Sân khấu", "Điện ảnh"] },
    { title: "Giải trí", items: ["Hậu trường showbiz", "Chuyện của sao"] },
    { title: "Thể thao", items: ["Bóng đá", "Golf", "Tennis", "Marathon"] },
    { title: "AI 365", items: ["Công nghệ số", "Bảo mật", "Mạng xã hội"] },
    { title: "Phụ nữ", items: ["Khỏe-đẹp", "Tâm sự", "Món ngon", "Video"] },
    { title: "Gia đình", items: ["Cha mẹ và con cái", "Không gian sống"] },
    { title: "Địa ốc", items: ["Dự án", "Thị trường", "Nhà đẹp"] },
  ];

  const featureLinks = [
    { label: "Video", icon: <PlayIcon className="w-5 h-5 text-blue-600" /> },
    { label: "Photo", icon: <PhotoIcon className="w-5 h-5 text-blue-600" /> },
    { label: "Longform", icon: <DocumentTextIcon className="w-5 h-5 text-blue-600" /> },
    { label: "Infographic", icon: <ChartBarIcon className="w-5 h-5 text-blue-600" /> },
  ];

  return (
    <>
      {/* HEADER TOP */}
      <header className="w-full">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-[#d80f1e] font-black text-4xl uppercase">
                NGƯỜI LAO ĐỘNG
              </Link>

              <div className="hidden lg:flex flex-col border-l pl-4">
                <span className="text-xs font-bold text-blue-800">
                  NGƯỜI LAO ĐỘNG News
                </span>
                <span className="text-sm text-gray-500">{today}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block relative">
                <input
                  className="border rounded-full pl-4 pr-10 py-2 text-sm w-64"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={executeSearch}
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>

              {isLoggedIn ? (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar isBordered as="button" name={user?.username} size="sm" />
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem key="logout" color="danger" onPress={logout}>
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Button
                  className="bg-[#004b9a] text-white font-bold"
                  radius="full"
                  onPress={() => navigate("/auth")}
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* MAIN NAV */}
        <div className="bg-[#004b9a] text-white">
          <div className="container mx-auto px-4">
            <ul className="flex items-center whitespace-nowrap overflow-hidden">
              <li>
                <Link to="/" className="flex items-center px-2 py-2 hover:bg-blue-700">
                  <HomeIcon className="w-6 h-6" />
                </Link>
              </li>

              {menuItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/${item.slug}`}
                    className="px-2 py-2 text-xs font-semibold uppercase hover:bg-blue-700 block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="ml-auto">
                <button
                  className="px-3 py-2 text-xl hover:bg-blue-700"
                  onClick={() => setShowMegaMenu((v) => !v)}
                >
                  …
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* MEGA MENU */}
      {showMegaMenu && (
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {primaryMenus.map((group) => {
                const parentSlug = slugify(group.title);
                return (
                  <div key={group.title}>
                    <h4 className="mb-3 font-semibold text-blue-800 uppercase text-sm">
                      <Link to={`/${parentSlug}`} onClick={() => setShowMegaMenu(false)}>
                        {group.title}
                      </Link>
                    </h4>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={`/${parentSlug}/${slugify(item)}`}
                            onClick={() => setShowMegaMenu(false)}
                            className="text-sm text-gray-700 hover:text-blue-600"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="border-l pl-6">
              <h4 className="mb-4 font-semibold text-blue-800 uppercase text-sm">
                Định dạng
              </h4>

              <div className="grid gap-3">
                {featureLinks.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <hr className="my-6" />

              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/nguoilaodong" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://www.youtube.com/@nguoilaodong" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
                <a href="https://zalo.me" target="_blank" rel="noopener noreferrer">
                  <SiZalo />
                </a>
                <a href="/rss">
                  <FaRss />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
