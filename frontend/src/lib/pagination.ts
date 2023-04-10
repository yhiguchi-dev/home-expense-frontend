import { type Pagination } from "@/lib/type/pagination";

export const paginate = ({
  page,
  perPage,
  totalNumber,
}: Pagination): Array<string | number> => {
  const division = Math.floor(totalNumber / perPage);
  const max = totalNumber % perPage > 0 ? division + 1 : division;
  const items: Array<string | number> = [1];
  if (page === 1 && max === 1) {
    return items;
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
    items.push(i);
  }
  if (nextShowing + 1 < max) {
    items.push("&hellip;");
  }
  if (nextShowing < max) {
    items.push(max);
  }
  console.log(items);
  return items;
};
