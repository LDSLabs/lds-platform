// Minimal path-based routing for a two-page site (landing + privacy
// policy). React Router isn't installed anywhere in this project, and
// adding it just for one extra static page would be more complexity than
// the site needs. Navigation between pages uses plain <a href> links (full
// page loads), so no client-side history management is required — the
// route is simply read once from window.location.pathname on load.

export const ROUTES = {
  HOME: '/',
  PRIVACY: '/privacy',
};

function normalizePath(pathname) {
  if (!pathname) return ROUTES.HOME;
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function getCurrentPath() {
  if (typeof window === 'undefined') return ROUTES.HOME;
  return normalizePath(window.location.pathname);
}

export function isHomeRoute(pathname = getCurrentPath()) {
  return pathname === ROUTES.HOME;
}

export function isPrivacyRoute(pathname = getCurrentPath()) {
  return pathname === ROUTES.PRIVACY;
}

// Resolves an in-page section link (e.g. "#product") so it keeps working
// when the visitor is on a different page (e.g. "/privacy"): it becomes
// "/#product", which the browser resolves back to the homepage at that
// anchor. Any href that isn't a bare hash (mailto:, https://, absolute
// paths like "/privacy") is returned unchanged.
export function resolveHref(href) {
  if (!href) return href;
  if (href.startsWith('#')) {
    return isHomeRoute() ? href : `${ROUTES.HOME}${href}`;
  }
  return href;
}
