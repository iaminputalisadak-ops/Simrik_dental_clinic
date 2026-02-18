export default function BookCta({ onBookClick }) {
  return (
    <section className="section book-cta">
      <div className="container">
        <h2 className="book-cta-title">Book Your Appointment</h2>
        <p className="book-cta-text">
          Prioritize your oral health with our General Dentistry services. Schedule your 
          appointment today. Our dedicated team is here to ensure your smile stays bright and healthy.
        </p>
        <button className="btn-primary btn-lg" onClick={onBookClick}>Book Appointment</button>
        <p className="book-cta-footer">
          Our clinic is dedicated to providing compassionate care and state-of-the-art 
          treatments to help you achieve optimal oral health and confidence in your smile.
        </p>
      </div>
    </section>
  );
}
