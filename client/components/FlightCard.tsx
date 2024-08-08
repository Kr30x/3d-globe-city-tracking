import React from 'react';
import { Plane } from 'lucide-react';

export const FlightCard = ({ flight, from, to }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <Plane className="w-5 h-5 mr-2 text-blue-500" />
          <span className="font-medium text-lg text-gray-800">{from} → {to}</span>
        </div>
        <span className="font-bold text-lg text-blue-600">${flight.price}</span>
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-gray-600 font-medium">{flight.departureTime}</p>
          <p className="text-gray-500">{flight.departureDate}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 font-medium">{flight.arrivalTime}</p>
          <p className="text-gray-500">{flight.arrivalDate}</p>
        </div>
      </div>
    </div>
  );
};