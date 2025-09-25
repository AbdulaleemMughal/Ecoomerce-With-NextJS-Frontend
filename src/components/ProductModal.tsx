"use client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useProduct } from "@/context/product.context";
import { useEffect, useState } from "react";
import { productType } from "@/types/productType";
import { X } from "lucide-react";
import { format } from "date-fns";
import Rating from "@mui/material/Rating";
import Image from "next/image";

type ProductModalProps = {
  open: boolean;
  setOpen: (c: boolean) => void;
  productId: number | null;
  setProductId: (id: number | null) => void;
};

export const ProductModal = ({
  open,
  setOpen,
  productId,
  setProductId,
}: ProductModalProps) => {
  const { getOneProduct } = useProduct();
  const [product, setProduct] = useState<productType>({} as productType);

  useEffect(() => {
    if (productId && open) {
      const fetchProduct = async () => {
        const singleProduct = await getOneProduct(productId);
        setProduct(singleProduct);
      };
      fetchProduct();
    }
  }, [open, productId, getOneProduct]);

  const getRandomColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-yellow-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-2xl w-[90%] md:w-[80%] max-w-[1000px] max-h-[90vh] overflow-y-auto shadow-xl">
          {/* Header - Fixed Image */}
          <div className="relative w-full h-64">
            <Image
              src={product.thumbnail || "/placeholder-image.jpg"}
              alt={product.title}
              fill
              className="object-cover rounded-t-2xl"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <button
              onClick={() => {
                setOpen(false);
                setProductId(null);
                setProduct({} as productType);
              }}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Rest of your content remains the same */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Product Info */}
            <div>
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>

              <div className="mt-6 space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {product.category}
                </p>
                <p>
                  <span className="font-semibold">Brand:</span> {product.brand}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${product.price}
                </p>
                <p>
                  <span className="font-semibold">Discount:</span>{" "}
                  {product.discountPercentage}%
                </p>
                <p>
                  <span className="font-semibold">Warranty:</span>{" "}
                  {product.warrantyInformation}
                </p>
                <p>
                  <span className="font-semibold">Shipping:</span>{" "}
                  {product.shippingInformation}
                </p>
                <p>
                  <span className="font-semibold">Created At:</span>{" "}
                  {product.meta?.createdAt &&
                    format(new Date(product.meta.createdAt), "MMM d, hh:mm a")}
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Reviews</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {product.reviews?.map((review, i) => {
                  const avatarColor = getRandomColor(review.reviewerName);
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 border-b pb-3 last:border-none"
                    >
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${avatarColor}`}
                      >
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{review.reviewerName}</p>
                          <span className="text-xs text-gray-500">
                            {format(new Date(review.date), "MMM d, hh:mm a")}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-1">{review.comment}</p>
                        <p className="text-yellow-500 mt-1 text-sm">
                          <Rating
                            defaultValue={product.rating}
                            precision={0.5}
                          />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
