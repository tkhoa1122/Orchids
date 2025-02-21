import React from 'react';
import OrchidCard from '../OrchidData/OrchidCard';           

const Orchids = ({ orchids, onOrchidClick }) => {
  return (
    <div className="orchids-container">
      {orchids.map((orchid) => (
        <div key={orchid.id} onClick={() => onOrchidClick(orchid)}>
          <OrchidCard orchid={orchid} />
        </div>
      ))}
    </div>
  );
};

export default Orchids;
