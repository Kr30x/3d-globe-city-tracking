"use client";

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CustomGlobe } from '@/components/CustomGlobe';
import { FlightCard } from '@/components/FlightCard';
import { ArrowLeftCircle, Plane, PlaneLanding, PlaneTakeoff } from 'lucide-react';

const mockFlights = [
  { id: 1, price: 299, departureDate: '2023-08-15', departureTime: '08:00', arrivalDate: '2023-08-15', arrivalTime: '14:30' },
  { id: 2, price: 349, departureDate: '2023-08-15', departureTime: '12:00', arrivalDate: '2023-08-15', arrivalTime: '18:30' },
  { id: 3, price: 279, departureDate: '2023-08-16', departureTime: '06:00', arrivalDate: '2023-08-16', arrivalTime: '12:30' },
];

export default function FlightResults() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const from_lat = parseFloat(searchParams.get('from_lat') || '0');
  const from_lng = parseFloat(searchParams.get('from_lng') || '0');
  const to_lat = parseFloat(searchParams.get('to_lat') || '0');
  const to_lng = parseFloat(searchParams.get('to_lng') || '0');

  const [selectedDate, setSelectedDate] = useState('');

  const filteredFlights = selectedDate
    ? mockFlights.filter(
        (flight) => flight.departureDate === selectedDate || flight.arrivalDate === selectedDate
      )
    : mockFlights;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="absolute top-4 left-4 z-10">
        <button
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleBack}
        >
          <ArrowLeftCircle className="text-gray-600" size={24} />
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 p-6 overflow-y-auto bg-gradient-to-b from-blue-50 to-white">
          <div className="space-y-4">
            <div className='w-full justify-center flex flex-row gap-10'>
              <div className="mt-4 flex items-center ">
                <PlaneTakeoff className='ml-4 mr-4'/>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-4 flex items-center ">
                <PlaneLanding className='ml-4 mr-4'/>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            {filteredFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} from={from} to={to} />
            ))}
          </div>
        </div>
        <div className="w-[50vw] h-full">
          <CustomGlobe
            startLat={from_lat}
            startLng={from_lng}
            endLat={to_lat}
            endLng={to_lng}
          />
        </div>
      </div>
    </div>
  );
}