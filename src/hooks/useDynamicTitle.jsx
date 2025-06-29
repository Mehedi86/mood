import { useEffect } from 'react';

const useDynamicTitle = (title) => {
  useEffect(() => {
    const current = document.title;
    
    document.title = `Edulab | ${title} `;
    
    return () => {
      document.title = current;
    };
  }, [title]);
};

export default useDynamicTitle;