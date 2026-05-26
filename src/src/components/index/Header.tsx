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
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { FaFacebookF, FaYoutube, FaRss } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const executeSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowMegaMenu(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };
  const menuItems = [
    'THỜI SỰ',
    'QUỐC TẾ',
    'LAO ĐỘNG',
    'BẠN ĐỌC',
    'NET ZERO',
    'KINH TẾ',
    'SỨC KHỎE',
    'GIÁO DỤC',
    'PHÁP LUẬT',
    'VĂN HÓA - VĂN NGHỆ',
    'GIẢI TRÍ',
    'THỂ THAO',
    'AI 365',
    'PHỤ NỮ',
    'GIA ĐÌNH',
    'ĐỊA ỐC',
  ];

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
        'Diễn đàn kinh tế',
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
    { title: 'Giáo dục', items: ['Du học', 'tuyển sinh', 'Sau bục giảng'] },
    {
      title: 'Pháp luật',
      items: ['Luật sư của bạn', 'Truy nã', 'Chuyện pháp đình'],
    },
    {
      title: 'Văn hóa - Văn nghệ',
      items: [
        'Âm nhạc',
        'Văn học',
        'Sân khấu',
        'Điện ảnh',
        'Nghe - Xem – Đọc gì?',
      ],
    },
    { title: 'Giải trí', items: ['Hậu trường showbiz', 'Chuyện của sao'] },
    {
      title: 'Thể thao',
      items: [
        'Bóng đá',
        'Golf',
        'Hậu trường',
        'Các môn thể thao khác',
        'Tennis',
        'Marathon',
      ],
    },
    {
      title: 'AI 365',
      items: ['Công nghệ số', 'Bảo mật', 'Mạng xã hội', 'Giải trí cùng AI'],
    },
    {
      title: 'Phụ nữ',
      items: [
        'Khỏe-đẹp',
        'Tâm sự',
        'Chuyện của sao',
        'Món ngon',
        'Điểm đến',
        'Tiêu dùng thông minh',
        'Video',
        'Bản lĩnh sống',
      ],
    },
    {
      title: 'Gia đình',
      items: ['Bí quyết làm đẹp', 'Cha mẹ và con cái', 'Không gian sống'],
    },
    {
      title: 'Địa ốc',
      items: [
        'Dự án',
        'Thị trường',
        'Nhà đẹp',
        'Doanh nhân',
        'Số hóa',
        'Vật tư',
        'Tài chính',
      ],
    },
    { title: 'Truy vết mạng xã hội', items: [] },
    { title: 'Hỏi nóng đáp nhanh', items: [] },
    { title: 'Đời sống', items: [] },
    { title: 'Khoa học', items: [] },
    { title: 'Giải mai vàng', items: [] },
    { title: 'Vùng miền', items: [] },
    { title: 'Người Việt yêu sử Việt', items: [] },
    {
      title: 'Dành cho bạn đọc VIP',
      items: [
        'Tiêu điểm quốc tế',
        'Chuyện thương trường',
        'Bí quyết cuộc sống',
        'Hồ sơ',
        'Độc, lạ đó đây',
      ],
    },
  ];

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
              <div className="hidden md:block relative">
                <input
                  className="border rounded-full pl-4 pr-10 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Tìm kiếm"
                  onClick={executeSearch}
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>

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
                <li key={item}>
                  <Link className="px-2 py-2 text-xs font-semibold uppercase hover:bg-blue-700 block">
                    {item}
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

      {showMegaMenu && (
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {primaryMenus.map((group) => (
                <div key={group.title}>
                  <h4 className="mb-3 font-semibold text-blue-800 uppercase text-sm">
                    {group.title}
                  </h4>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Link className="block px-2 py-1 rounded text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-l pl-6">
              <h4 className="mb-4 font-semibold text-blue-800 uppercase text-sm">
                Định dạng
              </h4>

              <div className="grid gap-3">
                {featureLinks.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50"
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              <hr className="my-6" />

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <LightBulbIcon className="w-5 h-5" /> Lý tưởng sống
                </li>
                <li className="flex items-center gap-3">
                  <MegaphoneIcon className="w-5 h-5" /> Nói thẳng
                </li>
                <li className="flex items-center gap-3">
                  <StarIcon className="w-5 h-5" /> Tin độc quyền
                </li>
                <li className="flex items-center gap-3">
                  <GlobeAltIcon className="w-5 h-5" /> Thị trường
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
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white">
                  <FaFacebookF />
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-600 hover:text-white">
                  <FaYoutube />
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white">
                  <SiZalo />
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white">
                  <FaRss />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
