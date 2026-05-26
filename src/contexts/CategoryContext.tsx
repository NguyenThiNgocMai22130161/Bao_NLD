import { createContext, useContext, useEffect, useState } from "react";
import { Category } from "@/types";
import { categoryService } from "@/services/category.service";

const CategoryContext = createContext<Category[]>([]);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryService.getAll().then(res => {
      setCategories(res.data.data);
    });
  }, []);

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
