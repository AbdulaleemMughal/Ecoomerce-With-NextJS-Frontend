"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";
import { productType } from "@/types/productType";
import { categoriesType } from "@/types/categoriesType";

type ProductContextType = {
  categories: categoriesType[];
  allProducts: productType[];
  totalProducts: number | null;
  limit: number;
  skip: number;
  search: string;
  debouncedSearch: string;
  loading: boolean;
  category: string;
  setCategory: (c: string) => void;
  setCategories: (c: []) => void;
  setSearch: (s: string) => void;
  setLimit: (n: number) => void;
  setSkip: (n: number) => void;
  getCategories: () => Promise<void>;
  getAllProducts: () => Promise<void>;
  getOneProduct: (productId: number) => Promise<productType>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [allProducts, setAllProducts] = useState<productType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const getAllProducts = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        category
          ? `/products/category/${encodeURIComponent(
              category
            )}/?limit=${limit}&skip=${skip}`
          : `/products/search?q=${encodeURIComponent(
              debouncedSearch
            )}&limit=${limit}&skip=${skip}`
      );
      setAllProducts(response.data.products ?? []);
      setTotalProducts(response.data.total ?? 0);
    } catch (err) {
      if (axios.isAxiosError(err)) console.error(err);
      else console.error(err);
    }
  }, [debouncedSearch, limit, skip, category]);

  useEffect(() => {
    setLoading(true);
    getAllProducts().finally(() => setLoading(false));
  }, [getAllProducts]);

  useEffect(() => {
    setSkip(0);
  }, [limit]);

  const getCategories = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/products/categories");
      setCategories(res.data ?? []);
    } catch (err) {
      if (axios.isAxiosError(err)) console.error(err);
      else console.error(err);
    }
  }, []);

  const getOneProduct = useCallback(async (productId: number) => {
    try {
      const response = await axiosInstance(`/products/${productId}`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        categories,
        allProducts,
        totalProducts,
        limit,
        skip,
        search,
        debouncedSearch,
        loading,
        category,
        setCategory,
        setSearch,
        setCategories,
        setLimit,
        setSkip,
        getCategories,
        getAllProducts,
        getOneProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return ctx;
};
