"use client";

import Image from "next/image";
import imagePlaceholder from "@/assets/images/imagePlaceholder.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ChevronDown, EllipsisVertical, Eye, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { itemPerPage } from "@/utils/itemsPerPage";
import { ProductPagination } from "./ProductPagination";
import { useProduct } from "@/context/product.context";
import { format } from "date-fns";
import Rating from "@mui/material/Rating";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ProductModal } from "./ProductModal";
import { useCart } from "@/context/cart.context";

export const Product = () => {
  const {
    allProducts,
    limit,
    debouncedSearch,
    setLimit,
    skip,
    category,
    setSkip,
    totalProducts,
    getAllProducts,
  } = useProduct();
  const { addProductToCart } = useCart();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [producttoVeiw, setProductToVeiw] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllProducts().finally(() => {
      setLoading(false);
    });
  }, [skip, limit, debouncedSearch, category, getAllProducts]);

  return (
    <>
      <div className="bg-white rounded-sm p-2">
        <Table className="border-b border-gray-400">
          <TableHeader className="text-sm bg-gray-100 overflow-hidden border-none">
            <TableRow className="text-[12px]">
              <TableHead className="w-[300px] rounded-tl-2xl rounded-bl-2xl pl-5">
                ORDER
              </TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead className="text-center">DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead className="text-center">RATING</TableHead>
              <TableHead>ITEMS</TableHead>
              <TableHead>DELIVERY METHOD</TableHead>
              <TableHead className="rounded-tr-2xl rounded-br-2xl"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-gray-200 animate-pulse rounded-full h-5 py-3"></div>
                    </TableCell>
                  </TableRow>
                ))
              : allProducts.map((product, index) => {
                  return (
                    <TableRow key={index} className="font-medium">
                      <TableCell className="flex items-center gap-2 pl-5">
                        <span className="border border-gray-300 rounded-md p-1">
                          {product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt="image"
                              className="rounded-sm"
                              width={35}
                              height={30}
                              unoptimized
                            />
                          ) : (
                            <Image
                              src={imagePlaceholder}
                              alt="image"
                              className="rounded-sm"
                              width={35}
                              height={30}
                              unoptimized
                            />
                          )}
                        </span>
                        {product.title.slice(0, 20) + "..."}
                      </TableCell>
                      <TableCell className="capitalize">
                        {product.category}
                      </TableCell>
                      <TableCell className="text-gray-500 text-center">
                        {format(
                          new Date(product.meta.createdAt),
                          "MMM d, hh:mm a"
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        ${product.price}
                      </TableCell>
                      <TableCell className="text-gray-500 text-center">
                        <Rating defaultValue={product.rating} precision={0.5} />
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {product.stock} items
                      </TableCell>
                      <TableCell className="text-gray-500 ">
                        Free Shipping
                      </TableCell>
                      <TableCell className="text-gray-500">
                        <Popover>
                          <PopoverTrigger>
                            <EllipsisVertical
                              size={16}
                              className="cursor-pointer"
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-32 p-0">
                            <div
                              className="text-blue-500 text-sm px-3 py-2 flex items-center gap-2 border-b border-gray-300 cursor-pointer font-medium hover:bg-gray-100"
                              onClick={() => {
                                setOpen(true);
                                setProductToVeiw(product.id);
                              }}
                            >
                              <Eye size={16} /> Veiw Details
                            </div>
                            <div
                              className="text-gray-500 text-sm px-3 py-2 flex items-center gap-2 cursor-pointer font-medium hover:bg-gray-100"
                              onClick={() => {
                                addProductToCart(product);
                              }}
                            >
                              <ShoppingCart size={16} /> Add To Cart
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  );
                })}
            {}
          </TableBody>
        </Table>
        <div className="mt-7 mb-3 flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:items-start">
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-sm">Items per page</p>
            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
              <DropdownMenuTrigger asChild>
                <div className="px-2 py-1.5 flex items-center justify-between w-16 bg-white rounded-lg cursor-pointer border border-gray-400">
                  {limit}{" "}
                  <ChevronDown
                    color="gray"
                    size={20}
                    className={`transition-transform duration-200 ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white w-20 p-2 rounded-lg mt-1 overflow-y-auto shadow-lg"
              >
                <DropdownMenuLabel className="font-semibold">
                  Items
                </DropdownMenuLabel>
                <DropdownMenuGroup className="mt-1">
                  {itemPerPage.map((item, index) => (
                    <div key={index}>
                      <DropdownMenuItem
                        onClick={() => setLimit(item.value)}
                        className="cursor-pointer"
                      >
                        {item.value}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </div>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="max-md:mx-auto">
          <ProductPagination
            page={totalProducts}
            limit={limit}
            skip={skip}
            setSkip={setSkip}
          />
          </div>
        </div>
      </div>
      <ProductModal
        open={open}
        setOpen={setOpen}
        productId={producttoVeiw}
        setProductId={setProductToVeiw}
      />
    </>
  );
};
