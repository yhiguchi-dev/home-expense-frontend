export interface Pagination {
  current: {
    page: number;
    perPage: number;
  };
  first: {
    page: number;
    perPage: number;
  };
  last: {
    page: number;
    perPage: number;
  };
  next?: {
    page: number;
    perPage: number;
  };
  previous?: {
    page: number;
    perPage: number;
  };
}

export const parseLinkHeader = (
  headers: Record<string, string>,
): Pagination => {
  const { link } = headers;
  console.log(link);
  return link.split(",").reduce<Pagination>(
    (previousValue, currentValue) => {
      console.log(currentValue);
      const _array = currentValue.split(";");
      console.log(_array);
      const urlValue = _array[0].trim().replace("<", "").replace(">", "");
      console.log(urlValue);
      const url = new URL(urlValue);
      const page = url.searchParams.get("page");
      const perPage = url.searchParams.get("per_page");
      const rel = _array[1].trim().split("=")[1].replaceAll('"', "");
      if (page != null && perPage != null) {
        return {
          ...previousValue,
          [rel]: {
            page: parseInt(page),
            perPage: parseInt(perPage),
          },
        };
      }
      // TODO
      throw Error("");
    },
    {
      first: { page: 0, perPage: 0 },
      current: { page: 0, perPage: 0 },
      last: { page: 0, perPage: 0 },
    },
  );
};

export const paginate = ({
  current,
  first,
  last,
}: Pagination): (
  | string
  | {
      page: number;
      perPage: number;
    }
)[] => {
  const { page: currentPage, perPage } = current;
  const { page: lastPage } = last;
  console.log(first);
  const items: (
    | string
    | {
        page: number;
        perPage: number;
      }
  )[] = [first];
  console.log(lastPage);
  if (lastPage === 1) {
    return items;
  }
  if (currentPage > 4) {
    items.push("&hellip;");
  }
  const prevShowing = currentPage - 2;
  const nextShowing = currentPage + 2;
  for (
    let i = prevShowing > 2 ? prevShowing : 2;
    i <= Math.min(lastPage, nextShowing);
    i++
  ) {
    const link = {
      page: i,
      perPage,
    };
    items.push(link);
  }
  if (nextShowing + 1 < lastPage) {
    items.push("&hellip;");
  }
  if (nextShowing < lastPage) {
    items.push(last);
  }
  console.log(items);
  return items;
};
