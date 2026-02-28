
import { useRef, useState, useEffect } from 'react';

interface FlowConnectorProps {
  fromSector: string;
  toSector: string;
  fromColor: string;
  toColor: string;
  label: string;
}

export default function FlowConnector({
  fromSector,
  toSector,
  fromColor,
  toColor,
  label,
}: FlowConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Guard against browsers that do not support IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Helper to safely build CSS color strings (fallback to transparent if invalid)
  const safeColor = (color: string, opacityHex: string) => {
    try {
      // Simple validation – ensure it starts with # or a CSS color name/function
      if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) || /^[a-zA-Z]/.test(color)) {
        return `${color}${opacityHex}`;
      }
    } catch {
      // ignore
    }
    return `transparent`;
  };

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center py-8 bg-gray-950"
    >
      {/* Animated flow line */}
      <div className="flex flex-col items-center gap-1">
        <div
          className={`w-0.5 transition-all duration-1000 ${
            visible ? 'h-16 opacity-100' : 'h-0 opacity-0'
          }`}
          style={{
            background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
          }}
        />
        <div
          className={`flex items-center gap-3 px-5 py-2 rounded-full border transition-all duration-700 ${
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{
            borderColor: safeColor(toColor, '40'),
            background: safeColor(toColor, '15'),
            transitionDelay: '400ms',
          }}
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i
              className="ri-arrow-down-line text-sm"
              style={{ color: toColor }}
            />
          </div>
          <span
            className="text-xs font-bold tracking-wide"
            style={{ color: toColor }}
          >
            {label}
          </span>
        </div>
        <div
          className={`w-0.5 transition-all duration-1000 ${
            visible ? 'h-16 opacity-100' : 'h-0 opacity-0'
          }`}
          style={{
            background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
            transitionDelay: '200ms',
          }}
        />
      </div>

      {/* Hidden labels for screen readers */}
      <span className="sr-only">
        {fromSector} flows into {toSector}
      </span>
    </div>
  );
}
