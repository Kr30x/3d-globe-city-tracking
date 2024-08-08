"use client";

import React from 'react';
import { RandomGlobe } from "@/components/randomglobe"
import FlightSearchForm from '@/components/FlightSeacrhForm';

export default function Component() {
  return (
    <div className="mt-10 flex flex-col min-h-screen w-full bg-white overflow-hidden">
      <div className="w-full bg-white p-8 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold tracking-tight text-sky-800 sm:text-5xl mb-2">SkyWay Travel</h1>
            <p className="text-sky-600 text-lg">Your journey begins with us</p>
          </div>
          <FlightSearchForm />
        </div>
      </div>
      <div className="relative w-full h-[90vh] overflow-hidden">
        <div className="flex absolute top-0 inset-x-0 -bottom-1/2 justify-center">
          <RandomGlobe />
        </div>
      </div>
    </div>
  )
}