import { PropsWithChildren, ReactElement } from "react";

import { Spacing, spacing } from "@/ui/parts/layout/type";

interface Props {
  display?: "none" | "inline" | "inline-block" | "block";
  p?: Spacing;
  px?: Spacing;
  py?: Spacing;
  pt?: Spacing;
  pr?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  inset?: "auto" | "0" | "50%" | "100%";
  top?: "auto" | "0" | "50%" | "100%";
  right?: "auto" | "0" | "50%" | "100%";
  bottom?: "auto" | "0" | "50%" | "100%";
  left?: "auto" | "0" | "50%" | "100%";
  width?: "auto" | "min-content" | "max-content" | "100%";
  height?: "auto" | "min-content" | "max-content" | "100%";
  shrink?: "0" | "1";
  grow?: "0" | "1";
}

const Box = ({
  display = "inline",
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  position,
  inset,
  top,
  right,
  bottom,
  left,
  width,
  height,
  children,
}: PropsWithChildren<Props>): ReactElement => {
  const paddingX = px
    ? {
        "padding-left": spacing[px],
        "padding-right": spacing[px],
      }
    : null;
  const paddingY = py
    ? {
        "padding-top": spacing[py],
        "padding-bottom": spacing[py],
      }
    : null;
  const style = {
    display,
    padding: p ? spacing[p] : null,
    "padding-top": pt ? spacing[pt] : null,
    "padding-right": pr ? spacing[pr] : null,
    "padding-bottom": pb ? spacing[pb] : null,
    "padding-left": pl ? spacing[pl] : null,
    ...paddingX,
    ...paddingY,
    position,
    inset,
    top,
    right,
    bottom,
    left,
    width,
    height,
  };
  const filtered = Object.fromEntries(
    Object.entries(style).filter(([, v]) => v != null),
  );
  return <div style={filtered}>{children}</div>;
};

export default Box;
