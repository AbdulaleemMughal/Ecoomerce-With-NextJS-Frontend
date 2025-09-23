"use client";

import { productType } from "@/types/productType";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartedProduct: productType[];
  setCartedProduct: (products: productType[]) => void;
  addProductToCart: (product: productType) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartedProduct, setCartedProduct] = useState<productType[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartedProducts");
    if (storedCart) {
      setCartedProduct(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartedProducts", JSON.stringify(cartedProduct));
  }, [cartedProduct]);

  const addProductToCart = (product: productType) => {
    setCartedProduct((prev) => [...prev, product]);
    toast.success("Add to cart successfully!", { duration: 2000 });
  };

  const removeFromCart = (id: number) => {
    setCartedProduct((prev) => prev.filter((item) => item.id !== id));
    toast.success("Remove from cart successfully!", { duration: 2000 });
  };

  return (
    <CartContext.Provider
      value={{
        cartedProduct,
        setCartedProduct,
        addProductToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a ProductProvider");
  }
  return ctx;
};
