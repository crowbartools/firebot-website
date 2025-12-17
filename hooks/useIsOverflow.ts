import { useRef, useState, useLayoutEffect, useEffect, useCallback } from "react";


export const useIsOverflow = (content?: string) => {
  const ref = useRef<HTMLElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  const checkOverflow = useCallback(() => {
    const { current } = ref;
    if (!current) return;

    // For horizontal overflow (single line ellipsis with white-space: nowrap)
    const hasOverflow = current.scrollWidth > current.clientWidth;

    // For vertical overflow (multi-line ellipsis with -webkit-line-clamp)
    // const hasOverflow = current.scrollHeight > current.clientHeight;

    setIsOverflow(hasOverflow);
  }, [ref.current]);

  useLayoutEffect(() => {
    const { current } = ref;
    if (!current) return;

    // Use ResizeObserver to re-check when the container size changes
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(checkOverflow);
      observer.observe(current);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    checkOverflow();
  }, [ref.current, content]);

  return { ref, isOverflow };
}