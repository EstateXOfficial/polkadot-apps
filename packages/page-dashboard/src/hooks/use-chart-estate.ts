import {useCallback, useEffect, useRef} from "react";

const useChartEstate = () => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptId = 'coingecko-widget-script';

  const loadScript = useCallback(
    () =>
      new Promise<void>((resolve) => {
        if (document.getElementById(scriptId)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://widgets.coingecko.com/gecko-coin-price-chart-widget.js';
        script.async = true;
        script.onload = () => {
          setTimeout(resolve, 100);
        };
        document.body.appendChild(script);
      }),
    [],
  );

  const renderWidget = useCallback(() => {
    if (!widgetRef.current) return;

    widgetRef.current.innerHTML = `
      <gecko-coin-price-chart-widget
        coin-id="estatex"
        currency="usd"
        locale="en"
        outlined="true"
      ></gecko-coin-price-chart-widget>
    `;
  }, []);

  useEffect(() => {
    const init = async () => {
      await loadScript();
      renderWidget();
    };

    init().catch(null);

    const handleResize = () => renderWidget();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, [loadScript, renderWidget]);

  return widgetRef;
}

export default useChartEstate;
