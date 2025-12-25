

/**
 * Configuration options for MultiFingerTap
 */
export interface MultiFingerTapOptions {
  /** Maximum duration in milliseconds for a tap (default: 300) */
  maxDuration?: number;
  /** Whether to prevent default touch behavior (default: true) */
  preventDefault?: boolean;
  /** Callback for any tap, receives finger count */
  onTap?: (fingers: number) => void;
  /** Callback for single finger tap */
  onSingleTap?: () => void;
  /** Callback for two finger tap */
  onDoubleTap?: () => void;
  /** Callback for three finger tap */
  onTripleTap?: () => void;
  /** Callback for 4+ finger tap, receives finger count */
  onMultiTap?: (fingers: number) => void;
}

/**
 * MultiFingerTap - Detects multi-finger tap gestures on touch devices
 */
export default class MultiFingerTap {
  private element: HTMLElement;
  private options: Required<Omit<MultiFingerTapOptions, 'onTap' | 'onSingleTap' | 'onDoubleTap' | 'onTripleTap' | 'onMultiTap'>> & Pick<MultiFingerTapOptions, 'onTap' | 'onSingleTap' | 'onDoubleTap' | 'onTripleTap' | 'onMultiTap'>;
  private touchStartTime: number | null = null;
  private touchStartCount: number = 0;
  private isActive: boolean = false;

  constructor(element: HTMLElement, options: MultiFingerTapOptions = {}) {
    this.element = element;
    this.options = {
      maxDuration: options.maxDuration ?? 300,
      preventDefault: options.preventDefault ?? true,
      onTap: options.onTap,
      onSingleTap: options.onSingleTap,
      onDoubleTap: options.onDoubleTap,
      onTripleTap: options.onTripleTap,
      onMultiTap: options.onMultiTap,
    };

    this.init();
  }

  private init(): void {
    if (!this.element) {
      throw new Error('MultiFingerTap: element is required');
    }

    this.element.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    this.isActive = true;
  }

  private handleTouchStart = (e: TouchEvent): void => {
    if (this.options.preventDefault) {
      e.preventDefault();
    }

    this.touchStartTime = Date.now();
    this.touchStartCount = e.touches.length;
  };

  private handleTouchEnd = (e: TouchEvent): void => {
    if (this.options.preventDefault) {
      e.preventDefault();
    }

    const duration = Date.now() - (this.touchStartTime ?? 0);
    const fingerCount = this.touchStartCount;

    if (duration < this.options.maxDuration && e.touches.length === 0) {
      this.triggerCallbacks(fingerCount);
    }
  };

  private triggerCallbacks(fingerCount: number): void {
    if (this.options.onTap) {
      this.options.onTap(fingerCount);
    }

    switch (fingerCount) {
      case 1:
        this.options.onSingleTap?.();
        break;
      case 2:
        this.options.onDoubleTap?.();
        break;
      case 3:
        this.options.onTripleTap?.();
        break;
      default:
        this.options.onMultiTap?.(fingerCount);
    }
  }

  /**
   * Remove event listeners and clean up
   */
  public destroy(): void {
    if (!this.isActive) return;

    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
    this.isActive = false;
  }

  /**
   * Update options dynamically
   */
  public updateOptions(newOptions: Partial<MultiFingerTapOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }
}


