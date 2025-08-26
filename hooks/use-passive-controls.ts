import { useEffect } from 'react';

export function usePassiveControls() {
  useEffect(() => {
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      if (type === 'wheel' || type === 'touchstart' || type === 'touchmove') {
        if (typeof options === 'object') {
          options.passive = true;
        } else if (options !== false) {
          options = { passive: true };
        }
      }
      return originalAddEventListener.call(this, type, listener, options);
    };

    return () => {
      EventTarget.prototype.addEventListener = originalAddEventListener;
    };
  }, []);
}
