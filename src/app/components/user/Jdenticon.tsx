import React, { useEffect, useRef } from "react";
import jdenticon from "./jdenticon-mod";

type JdenticonProps = {
  size?: string;
  value: string;
  style?: React.CSSProperties;
  className?: string;
};

function Jdenticon({ size = "500px", value, style, className }: JdenticonProps) {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const svg = jdenticon.toSvg(value, 500);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      ref.current.src = url;

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [value]);

  return (
    <div style={style} className={className}>
      <img ref={ref} alt="avatar" width={size} height={size} />
    </div>
  );
}

export default Jdenticon;
