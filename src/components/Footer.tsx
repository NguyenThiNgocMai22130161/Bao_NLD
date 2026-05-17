import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 200);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f7f7f7] pt-12 pb-6 border-t-4 border-[#d80f1e] mt-10 text-[#333] font-sans">
      <div className="container mx-auto px-4">
        <div className="mb-8 border-b border-gray-300 pb-6">
          <Link className="inline-block mb-4" to="/">
            <h1 className="text-[#d80f1e] font-black text-4xl tracking-tighter uppercase">
              NGƯỜI LAO ĐỘNG
            </h1>
          </Link>
          <div className="flex flex-wrap gap-x-5.5 gap-y-2 text-sm font-medium text-gray-600">
            {[
              "Thời sự",
              "Quốc tế",
              "Lao động",
              "Bạn đọc",
              "Kinh tế",
              "Sức khỏe",
              "Giáo dục",
              "Pháp luật",
              "Văn hóa - Văn nghệ",
              "Giải trí",
              "Thể thao",
              "AI 365",
              "Du lịch xanh",
              "Phụ nữ",
              "Gia đình",
              "Địa ốc",
            ].map((item) => (
              <Link
                key={item}
                className="hover:text-[#d80f1e] transition-colors"
                to="/"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[13px] leading-6">
          <div>
            <h3 className="font-bold text-base mb-3 text-gray-800 uppercase">
              BÁO NGƯỜI LAO ĐỘNG ĐIỆN TỬ
            </h3>
            <p className="mb-2">
              Cơ quan chủ quản: Thành ủy Thành phố Hồ Chí Minh
            </p>
            <p className="mb-2">
              © Giấy phép số 115/GP- BTTTT cấp ngày 09.02.2021
            </p>
            <p>
              Tổng Biên tập: <strong>NGUYỄN THỊ NGỌC MAI</strong>
            </p>
            <p>Phó Tổng Biên tập: NGỌC HÂN, NGỌC MAI, THANH NGÂN</p>
            <p>Tổng TKTS: LÊ THỊ THANH NGÂN</p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-3 text-gray-800 uppercase">
              TRỤ SỞ CHÍNH
            </h3>
            <p className="mb-1">
              Đường số 6, Phường Linh Trung, TP Thủ Đức, TPHCM
            </p>
            <p className="mb-1">
              Điện thoại: <span className="text-blue-600">098-765.4321</span> /{" "}
              <span className="text-blue-600">012-345.6789</span>
            </p>
            <p className="mb-4">
              Fax: <span className="text-blue-600">012-1234.4321</span>
            </p>

            <h4 className="font-bold mt-4 uppercase text-gray-700">
              LIÊN HỆ QUẢNG CÁO
            </h4>
            <p>LIÊN HỆ QUẢNG CÁO BÁO ĐIỆN TỬ</p>
            <p>
              Email:{" "}
              <span className="text-gray-600">
                lienhequangbadoanhnghiep@gmail.com
              </span>
            </p>
            <p>Điện thoại: 0987654321</p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-3 text-gray-800 uppercase">
              THEO DÕI CHÚNG TÔI
            </h3>
            <div className="flex gap-3 mb-6">
              <a
                className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:opacity-80"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                </svg>
              </a>

              <a
                className="w-8 h-8 rounded-full bg-[#0068FF] flex items-center justify-center text-white font-bold text-xs hover:opacity-80"
                href="#"
              >
                Zalo
              </a>
            </div>

            <h3 className="font-bold text-base mb-3 text-gray-800 uppercase">
              TẢI ỨNG DỤNG
            </h3>
            <div className="flex gap-3">
              <button className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-gray-800">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.07-3.11-1.04.05-2.29.69-3.02 1.55-.67.78-1.26 2.05-1.11 3.15 1.19.09 2.4-.71 3.06-1.59z" />
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[9px]">Download on the</div>
                  <div className="text-xs font-bold">App Store</div>
                </div>
              </button>

              <button className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-gray-800">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,13.08L18.33,16.64L15.4,13.7L20.3,10.93C20.5,11.03 20.64,11.23 20.64,11.5C20.64,11.77 20.5,12.5 20.3,13.08M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" />
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[9px]">GET IT ON</div>
                  <div className="text-xs font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="relative border-t border-gray-500 mt-8 pt-4 text-xs text-gray-500 text-center">
          <p>
            Bản quyền thuộc về Báo Người Lao Động. Các website khác đã được
            chúng tôi đồng ý cho khai thác thông tin, khi đăng lại phải ghi rõ
            nguồn: Theo Báo Người Lao Động (www.nld.com.vn).
          </p>
        </div>
      </div>

      {showTop && (
        <button
          className="fixed right-4 top-1/2 flex flex-col items-center justify-center bg-white border border-gray-300 w-12 h-12 rounded hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
          title="Lên đầu trang"
          onClick={scrollToTop}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] font-bold text-gray-600">TOP</span>
        </button>
      )}
    </footer>
  );
};

export default Footer;

