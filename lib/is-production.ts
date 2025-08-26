export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

if (isProduction && typeof window !== 'undefined') {
  // @ts-ignore
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    // @ts-ignore
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
  }
}
