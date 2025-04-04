import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

export function ScrollController() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Skip scroll manipulation if we're preserving scroll
    if (location.state?.preserveScroll) return;

    // Otherwise scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.key]);

  return null;
}
