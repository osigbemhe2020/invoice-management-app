export const breakpoints = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
} as const;

const device = {
  mobile: `(max-width: ${breakpoints.mobile}px)`,
  tablet: `(max-width: ${breakpoints.tablet}px)`,
  laptop: `(max-width: ${breakpoints.laptop}px)`,
};

export default device;