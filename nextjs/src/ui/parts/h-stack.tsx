import { type PropsWithChildren } from "react";

type Spacing = "1" | "2" | "3" | "10" | "24";

type SpacingStyle = Record<Spacing, string>;

const spacingStyle: SpacingStyle = {
  "1": "space-x-1",
  "2": "space-x-2",
  "3": "space-x-3",
  "10": "space-x-10",
  "24": "space-x-24",
};

type AlignItem = "center";

type AlignItemStyle = Record<AlignItem, string>;

const alignItemStyle: AlignItemStyle = {
  center: "items-center",
};

type Props = {
  spacing: Spacing;
  alignItem?: AlignItem;
};

const HStack = ({
  spacing,
  alignItem = "center",
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <div
      className={`flex h-full w-full ${spacingStyle[spacing]} ${alignItemStyle[alignItem]}`}
    >
      {children}
    </div>
  );
};
export default HStack;
