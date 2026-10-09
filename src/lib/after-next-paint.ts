/** Wait until the browser has painted, so a tap can show feedback before heavy work. */
export function afterNextPaint(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    const paint = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => resolve());
      });
    };

    const scheduler = (
      window as Window & { scheduler?: { yield?: () => Promise<void> } }
    ).scheduler;

    if (scheduler?.yield) {
      void scheduler.yield().then(paint);
      return;
    }

    paint();
  });
}
