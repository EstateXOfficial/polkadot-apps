import { useCallback, useEffect, useRef } from 'react';

const useTickerEstate = () => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptId = 'coingecko-ticker-widget-script';

  const loadScript = useCallback(
    () =>
      new Promise<void>((resolve) => {
        if (document.getElementById(scriptId)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://widgets.coingecko.com/gecko-coin-ticker-widget.js';
        script.async = true;
        script.onload = () => {
          setTimeout(resolve, 300);
        };
        document.body.appendChild(script);
      }),
    [],
  );

  const applyShadowStyles = useCallback(() => {
    if (!widgetRef.current) return;

    const widget = widgetRef.current.querySelector('gecko-coin-ticker-widget');
    if (!widget || !widget.shadowRoot) return;

    const priceElement = widget.shadowRoot.querySelector('.gecko-details-coin-price');
    if (priceElement) {
      (priceElement as HTMLElement).style.marginTop = '27px';
    }
  }, []);

  const renderWidget = useCallback(() => {
    if (!widgetRef.current) return;

    widgetRef.current.innerHTML = `
      <gecko-coin-ticker-widget
          coin-id="estatex"
          currency="usd"
          locale="en"
          outlined="true"
        ></gecko-coin-ticker-widget>
    `;

    // Применяем стили после рендера виджета
    setTimeout(applyShadowStyles, 100);
  }, [applyShadowStyles]);

  useEffect(() => {
    const init = async () => {
      await loadScript();
      renderWidget();
    };

    init().catch(null);

    const handleResize = () => {
      renderWidget();
      // Повторно применяем стили при изменении размера
      setTimeout(applyShadowStyles, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, [loadScript, renderWidget, applyShadowStyles]);

  return widgetRef;
};

export default useTickerEstate;
