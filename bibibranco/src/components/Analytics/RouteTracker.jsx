import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is available
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

export default RouteTracker; 