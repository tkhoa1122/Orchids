import React from 'react';
import OrchidCard from '../OrchidData/OrchidCard';           

const Orchids = ({ orchids }) => {
  return (
    <div className="orchids-container">
      {orchids.map((orchid) => (
        <OrchidCard key={orchid.id} orchid={orchid} />
      ))}
    </div>
  );
};

export default Orchids;
