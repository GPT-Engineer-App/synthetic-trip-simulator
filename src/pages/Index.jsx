import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Box, HStack, Icon } from "@chakra-ui/react";
import { FaCar, FaMapMarkerAlt, FaExclamationTriangle, FaTachometerAlt } from "react-icons/fa";

const generateRandomTripData = async (address) => {
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  const geocodeResponse = await fetch(geocodeUrl);
  const geocodeData = await geocodeResponse.json();
  const location = geocodeData.results[0].geometry.location;

  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=1500&type=point_of_interest&key=${apiKey}`;
  const placesResponse = await fetch(placesUrl);
  const placesData = await placesResponse.json();
  const destinations = placesData.results.map((place) => place.name);
  const destination = destinations[Math.floor(Math.random() * destinations.length)];

  const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(address)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;
  const directionsResponse = await fetch(directionsUrl);
  const directionsData = await directionsResponse.json();
  const events = directionsData.routes[0].legs[0].steps.map((step) => ({
    type: step.maneuver,
    location: step.html_instructions,
  }));

  return {
    start: address,
    destination,
    events,
  };
};

const Index = () => {
  const [address, setAddress] = useState("");
  const [tripData, setTripData] = useState(null);

  const handleSimulateTrip = async () => {
    const data = await generateRandomTripData(address);
    setTripData(data);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Simulate Synthetic Car Trips</Text>
        <Input placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <Button colorScheme="blue" onClick={handleSimulateTrip}>
          Simulate Trip
        </Button>
        {tripData && (
          <Box width="100%" p={4} borderWidth={1} borderRadius="lg">
            <Text fontSize="lg">
              Trip from {tripData.start} to {tripData.destination}
            </Text>
            <HStack spacing={4} mt={4}>
              <Icon as={FaMapMarkerAlt} boxSize={6} />
              <Text>Start: {tripData.start}</Text>
            </HStack>
            {tripData.events.map((event, index) => (
              <HStack key={index} spacing={4} mt={2}>
                <Icon as={event.type === "brake" ? FaExclamationTriangle : event.type === "acceleration" ? FaTachometerAlt : FaCar} boxSize={6} />
                <Text>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)} at {event.location}
                </Text>
              </HStack>
            ))}
            <HStack spacing={4} mt={4}>
              <Icon as={FaMapMarkerAlt} boxSize={6} />
              <Text>End: {tripData.start}</Text>
            </HStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
