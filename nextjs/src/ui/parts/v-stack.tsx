import { type PropsWithChildren } from "react";

type Spacing = "1" | "2" | "3" | "10" | "24";

type SpacingStyle = Record<Spacing, string>;

const spacingStyle: SpacingStyle = {
  "1": "space-y-1",
  "2": "space-y-2",
  "3": "space-y-3",
  "10": "space-y-10",
  "24": "space-y-24",
};

type Props = {
  spacing: Spacing;
};

const VStack = ({
  spacing,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <div className={`flex h-full w-full flex-col ${spacingStyle[spacing]}`}>
      {children}
    </div>
  );
};
export default VStack;
