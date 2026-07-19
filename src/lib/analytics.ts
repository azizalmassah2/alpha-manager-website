/**
 * Production Web Analytics Module (Google Analytics & Microsoft Clarity)
 * Measurement IDs are loaded securely from environment variables.
 */

declare global {
  interface Window {
    dataLayer: any[];
    clarity: (...args: any[]) => void;
  }
}

/**
 * Initializes Google Analytics
 */
export function initGA() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || typeof window === "undefined") return;

  // Prevent duplicate initialization
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) return;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_path: window.location.pathname,
      anonymize_ip: true
    });
  `;
  document.head.appendChild(script2);
}

/**
 * Track Page View event manually (useful for SPA routers)
 */
export function trackPageView(path: string) {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || typeof window === "undefined" || !window.dataLayer) return;

  // @ts-ignore
  if (typeof window.gtag === "function") {
    // @ts-ignore
    window.gtag("config", measurementId, {
      page_path: path
    });
  }
}

/**
 * Initializes Microsoft Clarity
 */
export function initClarity() {
  const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID;
  if (!projectId || typeof window === "undefined") return;

  // Prevent duplicate initialization
  if (window.clarity) return;

  const script = document.createElement("script");
  script.async = true;
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script","${projectId}");
  `;
  document.head.appendChild(script);
}
