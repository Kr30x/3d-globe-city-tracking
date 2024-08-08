import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ChevronsUpDown, Search } from "lucide-react"

const LocationInput = ({ id, label, placeholder, onLocationSelect }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [search, setSearch] = useState("")
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setLocations([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/api/search-locations?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      setError('Failed to fetch locations.');
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      handleSearch(search);
    }
  }, [open, search]);

  const capitalizeWords = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id} className="text-sky-700">{label}</Label>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-sky-200 focus:border-sky-500"
          >
            {value ? value : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-sky-700">Select a location</DialogTitle>
            <DialogDescription className="text-gray-600">
              Search for a city or country to select your location.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <Input
              placeholder="Search locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow"
            />
            <Button size="icon" onClick={() => handleSearch(search)} className="bg-sky-500 hover:bg-sky-600">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[250px] overflow-y-auto mt-4">
            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && locations.length === 0 && <p className="text-gray-600">No locations found.</p>}
            {locations.map((location, index) => (
              <Button
                key={`${location.city}-${location.country}-${index}`}
                variant="ghost"
                className="w-full justify-start text-left hover:bg-sky-100"
                onClick={() => {
                  const selectedValue = `${capitalizeWords(location.city)}, ${location.country.toUpperCase()}`;
                  setValue(selectedValue);
                  onLocationSelect({
                    city: capitalizeWords(location.city),
                    country: location.country.toUpperCase(),
                    lat: location.lat,
                    lng: location.lng
                  });
                  setOpen(false);
                }}
              >
                <div>
                  <span className="font-medium">{capitalizeWords(location.city)}</span>
                  <span className="text-gray-600">, {location.country.toUpperCase()}</span>
                </div>
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} className="bg-sky-500 hover:bg-sky-600">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LocationInput;