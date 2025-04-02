export type GapState = 'default' | 'error' | 'success';

export const getGap = (state: GapState = 'default'): string => {
  const gaps = {
    default: '0.1rem',
    error: '1rem',
    success: '1rem',
  };
  return gaps[state];
};
