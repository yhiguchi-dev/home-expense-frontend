import React, { useCallback, useState } from "react";

type Props = {
  verticalThreshold: number;
  onRefresh: () => void;
};

const PullToRefresh = ({
  verticalThreshold,
  onRefresh,
  children,
}: React.PropsWithChildren<Props>): JSX.Element => {
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      setTouchStart(event.touches[0].pageY);
    },
    []
  );
  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const distance = event.changedTouches[0].pageY - touchStart;
      if (distance > verticalThreshold) {
        onRefresh();
      }
    },
    [onRefresh, touchStart, verticalThreshold]
  );
  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {children}
    </div>
  );
};
export default PullToRefresh;
