// matchMedia (AntD breakpoints)
if (typeof (globalThis as any).matchMedia !== 'function') {
    (globalThis as any).matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated (AntD legacy)
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
  
  // ResizeObserver (otro clásico que falta en jsdom)
  if (typeof (globalThis as any).ResizeObserver === 'undefined') {
    (globalThis as any).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  
  // fetch/Response para jsdom (siempre útil en tests de UI que hacen fetch)
  import 'whatwg-fetch';
  