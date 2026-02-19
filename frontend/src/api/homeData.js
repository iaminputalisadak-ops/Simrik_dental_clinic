/**
 * Single shared promise for home data so Layout can prefetch and Home consumes without duplicate requests.
 */
const HOME_API = '/api/home.php';
let homeDataPromise = null;

export function getHomeDataPromise() {
  if (!homeDataPromise) {
    homeDataPromise = Promise.all([
      fetch(`${HOME_API}?part=critical`).then((r) => r.json()),
      fetch(`${HOME_API}?part=sections`).then((r) => r.json()),
    ]).then(([critical, sections]) => ({
      critical: critical?.success ? critical : null,
      sections: sections?.success ? sections : null,
    }));
  }
  return homeDataPromise;
}
