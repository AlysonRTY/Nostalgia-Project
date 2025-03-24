import { ReactNode, useState } from "react";
import { useInView } from "react-intersection-observer";

interface FadeInProps {
  children: ReactNode;
}

const FadeIn = ({ children }: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setIsVisible(true);
      }
    },
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 2.5s ease-in-out",
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
