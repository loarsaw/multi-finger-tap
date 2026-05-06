# @rustedcompier/multi-finger-tap

A lightweight, framework-agnostic library for detecting multi-finger tap gestures on touch devices.

## Installation

```bash
npm install @rustedcompier/multi-finger-tap
```

## Features

- 🎯 Detect 1, 2, 3, or more finger taps
- 🪶 Lightweight
- ⚛️ React hook included
- 🌐 Works in all modern browsers
- 💪 Written in TypeScript
- 🔧 Fully typed
-

## Usage

### Vanilla JavaScript

```javascript
import MultiFingerTap from "@rustedcompier/multi-finger-tap";

const element = document.getElementById("touch-area");

const detector = new MultiFingerTap(element, {
  onDoubleTap: () => console.log("Two fingers!"),
  onTripleTap: () => console.log("Three fingers!"),
});

// Clean up
detector.destroy();
```

### React

```jsx
import { useRef, useEffect } from "react";
import { useMultiFingerTap } from "@rustedcompier/multi-finger-tap";

function App() {
  const touchRef = useRef(null);

  useEffect(() => {
    const cleanup = useMultiFingerTap(touchRef, {
      onDoubleTap: () => alert("Two finger tap!"),
      onTripleTap: () => alert("Three finger tap!"),
    });

    return cleanup;
  }, []);

  return <div ref={touchRef}>Tap here</div>;
}
```

## API

### Options

- `maxDuration` (number): Max tap duration in ms (default: 300)
- `preventDefault` (boolean): Prevent default touch behavior (default: true)
- `onTap` (function): Called for any tap with finger count
- `onSingleTap` (function): 1 finger tap
- `onDoubleTap` (function): 2 finger tap
- `onTripleTap` (function): 3 finger tap
- `onMultiTap` (function): 4+ finger tap

## License

MIT
