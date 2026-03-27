import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Utilitarian component that scrolls the window to the top
 * whenever the route changes. Ensures a consistent 'start from top'
 * experience for all pages.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Smooth scroll for a premium feel
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
