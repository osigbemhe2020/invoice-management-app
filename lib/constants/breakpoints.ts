export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  laptop: 1440,
} as const;

const device = {
  mobile: `(max-width: ${breakpoints.mobile}px)`,
  tablet: `(max-width: ${breakpoints.tablet}px)`,
  laptop: `(max-width: ${breakpoints.laptop}px)`,
};

export default device;