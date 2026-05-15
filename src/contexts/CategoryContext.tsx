import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Category } from "@/types";
import { categoryService } from "@/services/category.service";

type CategoryContextValue = {
  categories: Category[];
  flatCategories: Category[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const CategoryContext = createContext<CategoryContextValue>({
  categories: [],
  flatCategories: [],
  loading: true,
  refresh: async () => {},
});

const flattenCategories = (cats: Category[]) => {
  const res: Category[] = [];
  const dfs = (arr: Category[]) => {
    for (const c of arr) {
      res.push(c);
      if (c.children?.length) dfs(c.children);
    }
  };
  dfs(cats);
  return res;
};

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const res = await categoryService.getAll();
      setCategories(res.data.data ?? []);
    } catch (e) {
      console.error("Load categories error:", e);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const flatCategories = useMemo(() => flattenCategories(categories), [categories]);

  return (
    <CategoryContext.Provider value={{ categories, flatCategories, loading, refresh }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
