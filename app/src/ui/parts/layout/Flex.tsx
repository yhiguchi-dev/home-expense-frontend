import { PropsWithChildren, ReactElement } from "react";

import { Spacing, spacing } from "@/ui/parts/layout/type";

interface Props {
  display?: "none" | "inline-flex" | "flex";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: Spacing;
}

const Flex = ({
  display = "flex",
  direction = "row",
  align,
  justify,
  wrap,
  gap,
  children,
}: PropsWithChildren<Props>): ReactElement => {
  const gapSpacing = gap ? spacing[gap] : null;
  const _gap = direction.startsWith("row")
    ? { "row-gap": gapSpacing }
    : { "column-gap": gapSpacing };
  const style = {
    display: display,
    "flex-flow": direction,
    "align-items": align,
    "justify-content": justify,
    "flex-wrap": wrap,
    ..._gap,
  };
  const filtered = Object.fromEntries(
    Object.entries(style).filter(([, v]) => v != null),
  );
  return <div style={filtered}>{children}</div>;
};

export default Flex;
