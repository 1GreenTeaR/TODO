import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import "./Resize.css";

type Props = {
  children?: ReactNode;
  initialHeight?: number;
};
export function Resize({ children, initialHeight }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(initialHeight);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeight(ref.current?.clientHeight as number);
    });
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="resize-wrapper" style={{ height: height }}>
      <div ref={ref}>{children}</div>
    </div>
  );
}
