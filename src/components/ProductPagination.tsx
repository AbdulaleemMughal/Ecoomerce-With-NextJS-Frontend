import Pagination from "@mui/material/Pagination";

type ProductPaginationProps = {
  page: number | null;
  limit: number;
  skip: number;
  setSkip: (skip: number) => void;
};

export const ProductPagination = ({
  page,
  limit,
  skip,
  setSkip,
}: ProductPaginationProps) => {
  const currentPage = Math.floor(skip / limit) + 1;

  return (
    <>
      <Pagination
        count={Math.ceil(page! / limit)}
        page={currentPage}
        onChange={(_, page) => {
          setSkip((page - 1) * limit);
        }}
      />
    </>
  );
};
