import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = '/api';
const DEFAULT_MEMBERS = [
  { name: 'Dr. Jinesh Babu R', qualification: 'BDS, MDS Orthodontics and Dentofacial Orthopaedics', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400' },
  { name: 'Dr. Sushritha Sricharan', qualification: 'BDS, MDS Conservative Dentistry and Endodontics', image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400' },
  { name: 'Dr. Sajan Shetty', qualification: 'BDS, MDS Prosthodontics & Implantologist', image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400' },
  { name: 'Dr. Faizuddin Imran', qualification: 'BDS, MDS Periodontology & Implantology', image_url: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?w=400' },
  { name: 'Dr. Sibikar P', qualification: 'BDS, MDS Pedodontics and Preventive Dentistry', image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400' },
  { name: 'Dr. Saurabh Pillai', qualification: 'BDS, MDS Oral and Maxillofacial Surgery', image_url: 'https://images.unsplash.com/photo-1618499891438-8cf651bb3104?w=400' },
];

export default function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/team.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.members?.length) setMembers(data.members);
        else setMembers(DEFAULT_MEMBERS);
      })
      .catch(() => setMembers(DEFAULT_MEMBERS));
  }, []);

  return (
    <section className="section team-section team-section-new">
      <div className="container">
        <p className="section-subtitle">TEAM</p>
        <h2 className="section-title">Our Team</h2>
        <div className="team-photo-grid">
          {members.map((member) => (
            <div key={member.id} className="team-photo-card">
              <div className="team-photo-img">
                <img src={member.image_url} alt={member.name} loading="lazy" />
                <div className="team-photo-hover">
                  <h3>{member.name}</h3>
                  <p>{member.qualification}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/about" className="btn-outline">Meet Our Team</Link>
      </div>
    </section>
  );
}
