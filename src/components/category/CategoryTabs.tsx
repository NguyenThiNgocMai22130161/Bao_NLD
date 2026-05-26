import { Category } from "@/types";
import { useNavigate } from "react-router-dom";

interface Props {
  items?: Category[];
}

export default function CategoryTabs({ items }: Props) {
  const navigate = useNavigate();

  if (!items || items.length === 0) return null;

  return (
    <div className="border-b mb-6">
      <ul className="flex gap-6 text-lg font-serif">
        {items.map(item => (
          <li
            key={item.id}
            onClick={() => navigate(`/${item.slug}`)}
            className="pb-2 cursor-pointer text-gray-600 hover:text-black"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
