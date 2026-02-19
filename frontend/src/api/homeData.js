/**
 * Single shared promise for home data. One request (full response) for fastest load.
 * Inline script in index.html can set window.__HOME_PREFETCH__ to start fetch before React.
 */
const HOME_API = '/api/home.php';
let homeDataPromise = null;

function parseFullToCriticalSections(full) {
  if (!full || !full.success) return { critical: null, sections: null };
  return {
    critical: {
      success: true,
      hero: full.hero,
      about: full.about,
      why_choose: full.why_choose,
      services: full.services,
    },
    sections: {
      success: true,
      team: full.team,
      gallery: full.gallery,
      blog: full.blog,
      before_after: full.before_after,
    },
  };
}

export function getHomeDataPromise() {
  if (homeDataPromise) return homeDataPromise;
  if (typeof window !== 'undefined' && window.__HOME_PREFETCH__) {
    homeDataPromise = Promise.resolve(window.__HOME_PREFETCH__).then((data) =>
      data && data.critical != null && data.sections != null ? data : parseFullToCriticalSections(data)
    );
    return homeDataPromise;
  }
  homeDataPromise = fetch(HOME_API)
    .then((r) => r.json())
    .then(parseFullToCriticalSections);
  return homeDataPromise;
}
