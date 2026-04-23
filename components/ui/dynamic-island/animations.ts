import { Transition, Variants } from "framer-motion";

const spring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.7,
};

export function createIslandShellVariants(isDesktop: boolean): Variants {
  const expandedWidth = isDesktop ? 382 : 336;

  return {
    idle: {
      width: 132,
      height: 38,
      borderRadius: 999,
      scale: isDesktop ? 1.06 : 1,
      transition: spring,
    },
    minimal: {
      width: 186,
      height: 46,
      borderRadius: 24,
      scale: isDesktop ? 1.08 : 1.02,
      transition: spring,
    },
    expanded: {
      width: expandedWidth,
      height: 166,
      borderRadius: 30,
      scale: isDesktop ? 1.1 : 1.03,
      transition: spring,
    },
  };
}

export const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};
