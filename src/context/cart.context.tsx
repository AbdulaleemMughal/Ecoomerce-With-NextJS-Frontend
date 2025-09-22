"use client";

import { productType } from "@/types/productType";
import { createContext, useContext, useState } from "react";

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

  const addProductToCart = (product: productType) => {
    setCartedProduct((prev) => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCartedProduct((prev) => prev.filter((item) => item.id !== id));
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
