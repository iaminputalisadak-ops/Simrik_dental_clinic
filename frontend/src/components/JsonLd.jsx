import { Helmet } from 'react-helmet-async';

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Simrik Dental Clinic',
  description: 'Best Dental Clinic in Lalitpur. Quality dental care including orthodontics, root canal, cosmetic dentistry, and more. Your smile is our pride.',
  url: 'https://simrikdental.com',
  telephone: '+977 9800000000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lalitpur',
    addressLocality: 'Lalitpur',
    addressCountry: 'NP'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '10:00',
    closes: '19:00'
  },
  priceRange: '$$'
};

export default function JsonLd() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
    </Helmet>
  );
}
