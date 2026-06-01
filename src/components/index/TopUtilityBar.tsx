import { Link } from 'react-router-dom';
import {
  LightBulbIcon,
  MegaphoneIcon,
  StarIcon,
  GlobeAltIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { FaFacebookF, FaYoutube, FaRss } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

export default function TopUtilityBar() {
  return (
    <div className="w-full bg-white border-b border-gray-300">
      <div className="container mx-auto px-4">
        <div className="h-10 flex items-center justify-between text-[13px] text-gray-700">
         
          <div className="flex items-center gap-5 min-w-0">
            <div className="whitespace-nowrap">
              <span className="font-medium">HOTLINE:</span>{' '}
              <span>0903.343.439</span>
              <span className="mx-1 text-gray-300">-</span>
              <span className="font-medium">HOTLINE Phát hành:</span>{' '}
              <span>0819.123.127</span>
              <span className="mx-1 text-gray-300">-</span>
              <a
                href="#"
                className="font-medium underline hover:text-blue-700"
              >
                ĐẶT MUA BÁO
              </a>
            </div>

            
            <div className="hidden lg:flex items-center gap-5 text-gray-600">
              <Link
                to="/ly-tuong-song"
                className="flex items-center gap-1.5 hover:text-blue-700"
              >
                <LightBulbIcon className="w-4 h-4" />
                Lý tưởng sống
              </Link>
              <Link
                to="/noi-thang"
                className="flex items-center gap-1.5 hover:text-blue-700"
              >
                <MegaphoneIcon className="w-4 h-4" />
                Nói thẳng
              </Link>
              <Link
                to="/tin-doc-quyen"
                className="flex items-center gap-1.5 hover:text-blue-700"
              >
                <StarIcon className="w-4 h-4" />
                Tin độc quyền
              </Link>
              <Link
                to="/thi-truong"
                className="flex items-center gap-1.5 hover:text-blue-700"
              >
                <GlobeAltIcon className="w-4 h-4" />
                Thị trường
              </Link>
              <Link
                to="/24h-qua"
                className="flex items-center gap-1.5 hover:text-blue-700"
              >
                <BellIcon className="w-4 h-4" />
                24h qua
              </Link>
            </div>
          </div>

         
          <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
            <a
              href="https://www.facebook.com/nguoilaodong"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
            >
              <FaFacebookF className="text-blue-600 text-sm" />
            </a>

            <div className="w-px h-9 bg-gray-300" />

            <a
              href="https://www.youtube.com/@nguoilaodong"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
            >
              <FaYoutube className="text-red-600 text-sm" />
            </a>

            <div className="w-px h-9 bg-gray-300" />

            <a
              href="https://zalo.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
            >
              <SiZalo className="text-blue-500 text-sm" />
            </a>

            <div className="w-px h-9 bg-gray-300" />

            <a
              href="/rss"
              aria-label="RSS"
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
            >
              <FaRss className="text-orange-500 text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
