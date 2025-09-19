import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { EllipsisVertical } from "lucide-react";
import { useProduct } from "@/hooks/useProduct";
import { useEffect } from "react";

const image =
  "https://yt3.ggpht.com/8srJLu4W7SkIsBh4T_hoLd7xVtfu2Hxb6Nb7rxfdxMChHsXCrgwk6lVJxJCRUNmaH_Znz29WS3k=s88-c-k-c0x00ffffff-no-rj";

export const Product = () => {
  const { allProducts, getAllProducts } = useProduct();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="bg-white rounded-sm p-2">
        <Table className="">
          <TableHeader className="text-sm bg-gray-100 overflow-hidden border-none">
            <TableRow className="text-[12px]">
              <TableHead className="w-[280px] rounded-tl-2xl rounded-bl-2xl pl-5">
                ORDER
              </TableHead>
              <TableHead className="w-[250px]">CATEGORY</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>RATING</TableHead>
              <TableHead>ITEMS</TableHead>
              <TableHead>DELIVERY METHOD</TableHead>
              <TableHead className="rounded-tr-2xl rounded-br-2xl"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allProducts.map((product) => {
              return (
                <TableRow className="font-medium">
                  <TableCell className="flex items-center gap-2 pl-5">
                    <span className="border border-gray-300 rounded-md p-1">
                      <Image
                        src={product.images[0]}
                        alt="image"
                        className="rounded-sm"
                        width={35}
                        height={30}
                        unoptimized
                      />
                    </span>
                    {product.title}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-gray-500">
                    {product.meta.createdAt}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    ${product.price}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {product.rating} stars
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {product.stock} items
                  </TableCell>
                  <TableCell className="text-gray-500 ">
                    Free Shipping
                  </TableCell>
                  <TableCell className="text-gray-500">
                    <EllipsisVertical size={16} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
