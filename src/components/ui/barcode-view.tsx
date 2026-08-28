"use client";

interface BarcodeViewProps {
  code: string;
  className?: string;
  height?: number;
}

export function BarcodeView({ code, className = "", height = 36 }: BarcodeViewProps) {
  // Deterministic bar widths generated from string characters
  const bars = code.split("").flatMap((char, i) => {
    const codeVal = char.charCodeAt(0);
    const w1 = (codeVal % 3) + 1;
    const w2 = ((codeVal >> 1) % 2) + 1;
    const w3 = ((codeVal >> 2) % 3) + 1;
    return [w1, 1, w2, 2, w3, 1];
  });

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`} suppressHydrationWarning>
      <svg
        height={height}
        className="w-full max-w-[220px]"
        viewBox={`0 0 ${bars.reduce((a, b) => a + b, 0)} 40`}
        preserveAspectRatio="none"
      >
        {bars.map((barWidth, idx) => {
          const x = bars.slice(0, idx).reduce((a, b) => a + b, 0);
          if (idx % 2 === 0) {
            return (
              <rect
                key={idx}
                x={x}
                y={0}
                width={barWidth}
                height={40}
                fill="#0f172a"
              />
            );
          }
          return null;
        })}
      </svg>
      <span className="font-mono text-[10px] tracking-widest text-slate-500 font-semibold">
        *{code}*
      </span>
    </div>
  );
}
