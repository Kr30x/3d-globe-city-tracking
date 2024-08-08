'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import LocationInput from '@/components/LocationInput';

export default function FlightSearchForm() {
  const router = useRouter();
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromLocation || !toLocation) {
      alert("Please select both departure and arrival locations.");
      return;
    }

    router.push(`/flight-results?from=${encodeURIComponent(fromLocation.city)}&to=${encodeURIComponent(toLocation.city)}&from_lat=${fromLocation.lat}&from_lng=${fromLocation.lng}&to_lat=${toLocation.lat}&to_lng=${toLocation.lng}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LocationInput
          id="from"
          label="From"
          placeholder="Enter departure city"
          onLocationSelect={(location) => setFromLocation(location)}
        />
        <LocationInput
          id="to"
          label="To"
          placeholder="Enter arrival city"
          onLocationSelect={(location) => setToLocation(location)}
        />
      </div>
      <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white mt-4">
        Search Flights
      </Button>
    </form>
  );
}