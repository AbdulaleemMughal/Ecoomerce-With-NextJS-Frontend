"use client";

import { useCallback, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { categoriesType } from "@/types/categoriesType";
import axios from "axios";
import { productType } from "@/types/productType";

export const useProduct = () => {
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [allProducts, setAllProducts] = useState<productType[]>([]);

  const getAllProducts = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/products");
      setAllProducts(response.data.products);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/products/categories");
      setCategories(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  }, []);

  return {
    categories,
    allProducts,
    setCategories,
    getCategories,
    getAllProducts,
  };
};
