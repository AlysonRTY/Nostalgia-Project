import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

export function ScrollController() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Only scroll to top if we're not preserving scroll
    if (!location.state?.preserveScroll) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.key, location.state?.preserveScroll]);

  return null;
}
