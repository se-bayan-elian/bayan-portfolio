/** Spring lift + subtle scale for glass cards (Framer whileHover) */
export const glassCardHover = {
  y: -7,
  scale: 1.02,
  transition: {
    type: "spring" as const,
    stiffness: 360,
    damping: 28,
    mass: 0.55,
  },
};

export const glassCardTap = { scale: 0.99 };

export const glassCardRest = { y: 0, scale: 1 };

/** When `overflow: hidden` would clip spring lift (e.g. CTA strip). */
export const glassCardHoverTight = {
  scale: 1.02,
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 32,
    mass: 0.5,
  },
};

export const glassCardTapTight = { scale: 0.995 };
