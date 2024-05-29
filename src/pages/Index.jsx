import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Box, HStack, Icon } from "@chakra-ui/react";
import { FaCar, FaMapMarkerAlt, FaExclamationTriangle, FaTachometerAlt } from "react-icons/fa";

const generateRandomTripData = (address) => {
  // Simulate trip data
  const destinations = ["Park", "Mall", "Office", "Restaurant", "Gym"];
  const destination = destinations[Math.floor(Math.random() * destinations.length)];
  const events = [
    { type: "brake", location: "Intersection" },
    { type: "acceleration", location: "Highway" },
    { type: "speeding", location: "School Zone" },
  ];

  return {
    start: address,
    destination,
    events,
  };
};

const Index = () => {
  const [address, setAddress] = useState("");
  const [tripData, setTripData] = useState(null);

  const handleSimulateTrip = () => {
    const data = generateRandomTripData(address);
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
