import { ReactNode, useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useScroll, useMotionValueEvent } from 'framer-motion';

interface FadeInProps {
  children: ReactNode;
}

const FadeIn = ({ children }: FadeInProps) => {
  const [opacity, setOpacity] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const { scrollY } = useScroll();

  const setRefs = (node: HTMLDivElement | null) => {
    inViewRef(node);
    elementRef.current = node;
  };

  useMotionValueEvent(scrollY, 'change', () => {
    if (inView && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(viewportHeight / 2 - elementCenter);
      const maxDistance = viewportHeight / 2;
      const newOpacity = 1 - distanceFromCenter / maxDistance;
      setOpacity(Math.max(0, newOpacity));
    } else {
      setOpacity(0);
    }
  });

  return (
    <div
      ref={setRefs}
      style={{ opacity }}
      className="transition-opacity duration-50"
    >
      {children}
    </div>
  );
};

export default FadeIn;