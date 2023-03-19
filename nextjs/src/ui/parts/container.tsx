import { type PropsWithChildren } from "react";

type Width = "60" | "1/4" | "full" | "screen";

type WidthStyle = Record<Width, string>;

const widthStyle: WidthStyle = {
  "60": "w-60",
  full: "w-full",
  "1/4": "w-1/4",
  screen: "w-screen",
};

type Height = "60" | "full" | "screen" | "1/2";

type HeightStyle = Record<Height, string>;

const heightStyle: HeightStyle = {
  "60": "h-60",
  full: "h-full",
  "1/2": "h-1/2",
  screen: "h-screen",
};

type BackgroundColor = "white" | "gray-100" | "gray-400";

type BackgroundColorStyle = Record<BackgroundColor, string>;

const backgroundColorStyle: BackgroundColorStyle = {
  white: "bg-white",
  "gray-100": "bg-gray-100",
  "gray-400": "bg-gray-400",
};

type BoxShadow = "default";

type BoxShadowStyle = Record<BoxShadow, string>;

const boxShadowStyle: BoxShadowStyle = {
  default: "shadow",
};

type RoundedCorner = "default" | "sm" | "lg";

type RoundedCornerStyle = Record<RoundedCorner, string>;

const roundedCornerStyle: RoundedCornerStyle = {
  default: "rounded",
  sm: "rounded-sm",
  lg: "rounded-lg",
};

type Props = {
  width?: Width;
  height?: Height;
  backgroundColor?: BackgroundColor;
  boxShadow?: BoxShadow;
  roundedCorner?: RoundedCorner;
};

const Container = ({
  width,
  height,
  backgroundColor,
  boxShadow,
  roundedCorner,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const widthValue = width !== undefined ? widthStyle[width] : "";
  const heightValue = height !== undefined ? heightStyle[height] : "";
  const backgroundColorValue =
    backgroundColor !== undefined ? backgroundColorStyle[backgroundColor] : "";
  const boxShadowValue =
    boxShadow !== undefined ? boxShadowStyle[boxShadow] : "";
  const roundedCornerValue =
    roundedCorner !== undefined ? roundedCornerStyle[roundedCorner] : "";
  const classNameValue = [
    "none:container",
    "mx-auto",
    widthValue,
    heightValue,
    backgroundColorValue,
    boxShadowValue,
    roundedCornerValue,
  ]
    .filter((value) => {
      return value.length !== 0;
    })
    .join(" ");
  return <div className={classNameValue}>{children}</div>;
};
export default Container;
