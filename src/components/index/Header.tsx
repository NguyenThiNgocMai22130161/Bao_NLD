import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Avatar, Button } from '@heroui/react';
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
} from '@heroicons/react/24/outline';
import { FaFacebookF, FaYoutube, FaRss } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

import { useAuth } from '@/contexts/AuthContext';

/* ------------------ utils ------------------ */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');

/* ------------------ component ------------------ */
const Header = () => {
  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const [showMegaMenu, setShowMegaMenu] = useState(false);

  /* -------- main menu (top blue bar) -------- */
  const [searchTerm, setSearchTerm] = useState('');
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
    if (e.key === 'Enter') executeSearch();
  };

  /* -------- main menu -------- */
  const menuItems = [
    { label: 'THỜI SỰ', slug: 'thoi-su' },
    { label: 'QUỐC TẾ', slug: 'quoc-te' },
    { label: 'LAO ĐỘNG', slug: 'lao-dong' },
    { label: 'BẠN ĐỌC', slug: 'ban-doc' },
    { label: 'NET ZERO', slug: 'net-zero' },
    { label: 'KINH TẾ', slug: 'kinh-te' },
    { label: 'SỨC KHỎE', slug: 'suc-khoe' },
    { label: 'GIÁO DỤC', slug: 'giao-duc' },
    { label: 'PHÁP LUẬT', slug: 'phap-luat' },
    { label: 'VĂN HÓA - VĂN NGHỆ', slug: 'van-hoa-van-nghe' },
    { label: 'GIẢI TRÍ', slug: 'giai-tri' },
    { label: 'THỂ THAO', slug: 'the-thao' },
    { label: 'AI 365', slug: 'ai-365' },
    { label: 'PHỤ NỮ', slug: 'phu-nu' },
    { label: 'GIA ĐÌNH', slug: 'gia-dinh' },
    { label: 'ĐỊA ỐC', slug: 'dia-oc' },
  ];

  /* -------- mega menu (left) -------- */
  const primaryMenus = [
    { title: 'Thời sự', items: ['Chính trị', 'Xã hội', 'Đô thị'] },
    {
      title: 'Quốc tế',
      items: ['Người Việt đó đây', 'Hay - lạ', 'Vấn đề nóng'],
    },
    {
      title: 'Lao động',
      items: ['Công đoàn - Công nhân', 'Việc làm', 'An sinh xã hội'],
    },
    {
      title: 'Bạn đọc',
      items: ['Cuộc sống nhân ái', 'Tôi lên tiếng', 'Góc ảnh bạn đọc'],
    },
    {
      title: 'Net Zero',
      items: ['Tin tức & Xu hướng', 'Chuyển đổi xanh', 'Sống xanh', 'Cẩm nang'],
    },
    {
      title: 'Kinh tế',
      items: [
        'Kinh doanh',
        'Tiêu dùng',
        'Ôtô - Xe - Điện máy',
        'Bất động sản',
        'Tài chính-Chứng khoán',
      ],
    },
    {
      title: 'Sức khỏe',
      items: [
        'Chuyển động y học',
        'Giới tính',
        'Bác sĩ của bạn',
        'Khỏe và đẹp',
      ],
    },
    { title: 'Giáo dục', items: ['Du học', 'Tuyển sinh', 'Sau bục giảng'] },
    {
      title: 'Pháp luật',
      items: ['Luật sư của bạn', 'Truy nã', 'Chuyện pháp đình'],
    },
    {
      title: 'Văn hóa - Văn nghệ',
      items: ['Âm nhạc', 'Văn học', 'Sân khấu', 'Điện ảnh'],
    },
    { title: 'Giải trí', items: ['Hậu trường showbiz', 'Chuyện của sao'] },
    { title: 'Thể thao', items: ['Bóng đá', 'Golf', 'Tennis', 'Marathon'] },
    { title: 'AI 365', items: ['Công nghệ số', 'Bảo mật', 'Mạng xã hội'] },
    { title: 'Phụ nữ', items: ['Khỏe-đẹp', 'Tâm sự', 'Món ngon', 'Video'] },
    { title: 'Gia đình', items: ['Cha mẹ và con cái', 'Không gian sống'] },
    { title: 'Địa ốc', items: ['Dự án', 'Thị trường', 'Nhà đẹp'] },
  ];

  /* -------- format links (right mega menu) -------- */
  const featureLinks = [
    { label: 'Video', icon: <PlayIcon className="w-5 h-5 text-blue-600" /> },
    { label: 'Photo', icon: <PhotoIcon className="w-5 h-5 text-blue-600" /> },
    {
      label: 'Longform',
      icon: <DocumentTextIcon className="w-5 h-5 text-blue-600" />,
    },
    {
      label: 'Infographic',
      icon: <ChartBarIcon className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <>
      {/* ================= HEADER TOP ================= */}
      <header className="w-full">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                className="text-[#d80f1e] font-black text-4xl uppercase"
                to="/"
              >
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
              <input
                className="hidden md:block border rounded-full px-4 py-2 text-sm w-64"
                placeholder="Tìm kiếm"
              />

              {isLoggedIn ? (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      classNames={{
                        base: 'bg-[#004b9a] text-white ring-[#004b9a]',
                      }}
                      name={user?.username}
                      size="sm"
                    />
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      key="saved"
                      onPress={() => navigate('/saved-posts')}
                    >
                      Tủ sách của tôi
                    </DropdownItem>
                    <DropdownItem
                      key="history"
                      onPress={() => navigate('/history')}
                    >
                      Tin đã xem
                    </DropdownItem>
                    <DropdownItem
                      key="opinions"
                      onPress={() => navigate('/my-comments')}
                    >
                      Ý kiến của bạn
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onPress={logout}>
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Button
                  className="bg-[#004b9a] text-white font-bold"
                  radius="full"
                  onPress={() => navigate('/auth')}
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* ================= MAIN NAV ================= */}
        <div className="bg-[#004b9a] text-white">
          <div className="container mx-auto px-4">
            <ul className="flex items-center whitespace-nowrap overflow-hidden">
              <li>
                <Link
                  className="flex items-center px-2 py-2 hover:bg-blue-700"
                  to="/"
                >
                  <HomeIcon className="w-6 h-6" />
                </Link>
              </li>

              {menuItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    className="px-2 py-2 text-xs font-semibold uppercase hover:bg-blue-700 block"
                    to={`/${item.slug}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="ml-auto">
                <button
                  className="px-3 py-2 text-xl font-bold hover:bg-blue-700"
                  onClick={() => setShowMegaMenu((v) => !v)}
                >
                  …
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* ================= MEGA MENU ================= */}
      {showMegaMenu && (
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">
            {/* LEFT */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {primaryMenus.map((group) => {
                const parentSlug = slugify(group.title);

                return (
                  <div key={group.title}>
                    <h4 className="mb-3 font-semibold text-blue-800 uppercase text-sm">
                      <Link
                        to={`/${parentSlug}`}
                        onClick={() => setShowMegaMenu(false)}
                      >
                        {group.title}
                      </Link>
                    </h4>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Link
                            className="block px-2 py-1 rounded text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                            to={`/${parentSlug}/${slugify(item)}`}
                            onClick={() => setShowMegaMenu(false)}
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

            {/* RIGHT */}
            <div className="border-l pl-6">
              <h4 className="mb-4 font-semibold text-blue-800 uppercase text-sm">
                Định dạng
              </h4>

              <div className="grid gap-3">
                {featureLinks.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-800" // Thêm text color để đảm bảo đồng bộ
                    to={`/${item.label.toLowerCase()}`}
                    onClick={() => setShowMegaMenu(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              <hr className="my-6" />

              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <Link
                    className="flex items-center gap-3 hover:text-blue-600"
                    to="/ly-tuong-song"
                    onClick={() => setShowMegaMenu(false)}
                  >
                    <LightBulbIcon className="w-5 h-5" /> Lý tưởng sống
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-3 hover:text-blue-600"
                    to="/noi-thang"
                    onClick={() => setShowMegaMenu(false)}
                  >
                    <MegaphoneIcon className="w-5 h-5" /> Nói thẳng
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-3 hover:text-blue-600"
                    to="/tin-doc-quyen"
                    onClick={() => setShowMegaMenu(false)}
                  >
                    <StarIcon className="w-5 h-5" /> Tin độc quyền
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-3 hover:text-blue-600"
                    to="/thi-truong"
                    onClick={() => setShowMegaMenu(false)}
                  >
                    <GlobeAltIcon className="w-5 h-5" /> Thị trường
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5" /> Liên hệ
                </li>
                <li className="flex items-center gap-3">
                  <BuildingOffice2Icon className="w-5 h-5" /> Thông tin tòa soạn
                </li>
                <li className="flex items-center gap-3">
                  <RectangleGroupIcon className="w-5 h-5" /> Liên hệ quảng cáo
                </li>
              </ul>

              <hr className="my-6" />

              <div className="flex items-center gap-4">
                <a
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white"
                  href="https://www.facebook.com/nguoilaodong"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaFacebookF />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-600 hover:text-white"
                  href="https://www.youtube.com/@nguoilaodong"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaYoutube />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white"
                  href="https://zalo.me"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SiZalo />
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white"
                  href="/rss"
                >
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
