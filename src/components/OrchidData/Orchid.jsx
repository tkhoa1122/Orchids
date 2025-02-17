import React from 'react';
import { ListOfOrchid } from '../data/ListOfOrchid'; // sửa named import
import OrchidCard from '../OrchidData/OrchidCard';           

const Orchids = () => {
  return (
    <div className="orchids-container">
      {ListOfOrchid.map((orchid) => (
        <OrchidCard key={orchid.id} orchid={orchid} />
      ))}
    </div>
  );
};

export default Orchids;
