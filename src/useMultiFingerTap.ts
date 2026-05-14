import { useEffect, useState } from "react";
import type { RefObject } from "react";
import MultiFingerTap from "./MultiFingerTap";
import type { MultiFingerTapOptions } from "./MultiFingerTap";

type UseMultiFingerTapOptions = Omit<MultiFingerTapOptions, 'onTap'>;

export function useMultiFingerTap(
  ref: RefObject<HTMLElement>,
  options: UseMultiFingerTapOptions = {},
  onTap?: (fingers: number) => void,
): number {
  const [fingerCount, setFingerCount] = useState(0);
  
  useEffect(() => {
    if (!ref.current) return;

    const detector = new MultiFingerTap(ref.current, {
      ...options,
      onTap: (fingers) => {
        setFingerCount(fingers);
        onTap?.(fingers);
      },
    });

    return () => {
      detector.destroy();
    };
  }, [ref, options, onTap]);

  return fingerCount;
}