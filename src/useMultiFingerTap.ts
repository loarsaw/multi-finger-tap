import { useEffect } from 'react';
import type { RefObject } from 'react';
import MultiFingerTap from './MultiFingerTap';
import type { MultiFingerTapOptions } from './MultiFingerTap';

export function useMultiFingerTap(
  ref: RefObject<HTMLElement>,
  options: MultiFingerTapOptions = {}
): void {
  useEffect(() => {
    if (!ref.current) return;

    const detector = new MultiFingerTap(ref.current, options);

    return () => {
      detector.destroy();
    };
  }, [ref, options]);
}
