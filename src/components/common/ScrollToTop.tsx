import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [pathname, search]);

  return null;
};
