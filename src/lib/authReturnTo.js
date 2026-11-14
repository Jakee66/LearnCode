/** Same-origin post-login destination taken from ?returnTo=, defaults to "/". */
export const safeReturnTo = () => {
  try {
    const value = new URLSearchParams(window.location.search).get('returnTo');
    if (value && value.startsWith('/') && !value.startsWith('//')) return value;
  } catch {
    /* ignore */
  }
  return '/';
};
