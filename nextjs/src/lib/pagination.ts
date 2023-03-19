type PaginationItem = { page: number; items: string[] };

export type Pagination = {
  page: number;
  perPage: number;
  totalNumber: number;
};

export const paginate = ({
  page,
  perPage,
  totalNumber,
}: Pagination): PaginationItem => {
  const division = Math.floor(totalNumber / perPage);
  const max = totalNumber % perPage > 0 ? division + 1 : division;
  const items = ["1"];
  if (page === 1 && max === 1) {
    return { page, items };
  }
  if (page > 4) {
    items.push("&hellip;");
  }
  const prevShowing = page - 2;
  const nextShowing = page + 2;
  for (
    let i = prevShowing > 2 ? prevShowing : 2;
    i <= Math.min(max, nextShowing);
    i++
  ) {
    items.push(i.toString());
  }
  if (nextShowing + 1 < max) {
    items.push("&hellip;");
  }
  if (nextShowing < max) {
    items.push(max.toString());
  }
  return { page, items };
};
