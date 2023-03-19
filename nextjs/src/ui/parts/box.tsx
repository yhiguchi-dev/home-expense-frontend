import { type PropsWithChildren } from "react";

type MarginX = "1" | "2" | "3" | "10" | "24";

type MarginXStyle = Record<MarginX, string>;

const marginXStyle: MarginXStyle = {
  "1": "mx-1",
  "2": "mx-2",
  "3": "mx-3",
  "10": "mx-10",
  "24": "mx-24",
};

type MarginY = "1" | "2" | "3" | "10" | "24";

type MarginYStyle = Record<MarginY, string>;

const marginYStyle: MarginYStyle = {
  "1": "my-1",
  "2": "my-2",
  "3": "my-3",
  "10": "my-10",
  "24": "my-24",
};

type Margin = "1" | "2" | "3" | "10" | "24";

type MarginStyle = Record<Margin, string>;

const marginStyle: MarginStyle = {
  "1": "m-1",
  "2": "m-2",
  "3": "m-3",
  "10": "m-10",
  "24": "m-24",
};

type PaddingX = "1" | "2" | "3" | "6" | "10" | "24";

type PaddingXStyle = Record<PaddingX, string>;

const paddingXStyle: PaddingXStyle = {
  "1": "px-1",
  "2": "px-2",
  "3": "px-3",
  "6": "px-6",
  "10": "px-10",
  "24": "px-24",
};

type PaddingY = "1" | "1.5" | "2" | "3" | "4" | "10" | "24";

type PaddingYStyle = Record<PaddingY, string>;

const paddingYStyle: PaddingYStyle = {
  "1": "py-1",
  "1.5": "py-1.5",
  "2": "py-2",
  "3": "py-3",
  "4": "py-4",
  "10": "py-10",
  "24": "py-24",
};

type Padding = "1" | "2" | "3" | "10" | "24";

type PaddingStyle = Record<Padding, string>;

const paddingStyle: PaddingStyle = {
  "1": "p-1",
  "2": "p-2",
  "3": "p-3",
  "10": "p-10",
  "24": "p-24",
};

type Props = {
  margin?: Margin;
  marginX?: MarginX;
  marginY?: MarginY;
  padding?: Padding;
  paddingX?: PaddingX;
  paddingY?: PaddingY;
};

const Box = ({
  margin,
  marginX,
  marginY,
  padding,
  paddingX,
  paddingY,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const marginValue = margin !== undefined ? marginStyle[margin] : "";
  const marginXValue = marginX !== undefined ? marginXStyle[marginX] : "";
  const marginYValue = marginY !== undefined ? marginYStyle[marginY] : "";
  const paddingValue = padding !== undefined ? paddingStyle[padding] : "";
  const paddingXValue = paddingX !== undefined ? paddingXStyle[paddingX] : "";
  const paddingYValue = paddingY !== undefined ? paddingYStyle[paddingY] : "";
  const classNameValue = [
    "h-full",
    "w-full",
    marginValue,
    marginXValue,
    marginYValue,
    paddingValue,
    paddingXValue,
    paddingYValue,
  ]
    .filter((value) => {
      return value.length !== 0;
    })
    .join(" ");
  return <div className={classNameValue}>{children}</div>;
};
export default Box;
