"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe2").then((m) => m.World), {
  ssr: false,
});

// Function to calculate distance between two points on the globe
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

// Function to calculate arc height based on distance
function calculateArcHeight(distance) {
  const minHeight = 0.2;
  const maxHeight = 0.5;
  const minDistance = 0; // km
  const maxDistance = 20000; // km (approximately half the Earth's circumference)

  // Linear interpolation
  const normalizedDistance = Math.min(Math.max(distance, minDistance), maxDistance);
  const height = minHeight + (normalizedDistance - minDistance) * (maxHeight - minHeight) / (maxDistance - minDistance);
  console.log(height)
  return height;
}

export function CustomGlobe({ startLat, startLng, endLat, endLng }) {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#135a85",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.3,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: startLat, lng: startLng },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

  // Calculate distance and arc height
  const distance = calculateDistance(startLat, startLng, endLat, endLng);
  const arch = calculateArcHeight(distance);

  const sampleArcs = Array.from({ length: 16 }, (_, i) => ({
    order: i + 1,
    startLat: startLat,
    startLng: startLng,
    endLat: endLat,
    endLng: endLng,
    arcAlt: arch,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  console.log(sampleArcs);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full h-[90%]">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}