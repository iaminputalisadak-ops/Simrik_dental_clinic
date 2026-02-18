import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://lagankheldental.com';

const stripHtml = (html) => {
  if (!html || typeof html !== 'string') return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160);
};
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200';

export default function SeoHead({
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false
}) {
  const fullTitle = title ? `${title} | Lagankhel Dental Clinic` : 'Lagankhel Dental Clinic | Best Dental Clinic in Lalitpur';
  const fullUrl = path ? `${SITE_URL}${path.startsWith('/') ? path : '/' + path}` : SITE_URL;
  const fullDesc = (description ? stripHtml(description) : '') || 'Lagankhel Dental Clinic - Best Dental Clinic in Lalitpur. Your smile is our pride. Quality dental care with experienced professionals.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Lagankhel Dental Clinic" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
