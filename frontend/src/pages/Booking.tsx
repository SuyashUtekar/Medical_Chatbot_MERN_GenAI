import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Footer from "../components/footer/Footer";
import { useTheme, useMediaQuery } from "@mui/material";

const Booking = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  // States for search and booking input
  const [disease, setDisease] = useState("");
  const [location, setLocation] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorsList, setDoctorsList] = useState<string[]>([]); // Simulated doctor list

  // Search doctors based on disease and location
  const handleSearch = async () => {
    // For now, we'll just simulate a doctor list.
    // You can add your backend/web scraping logic here later.
    const simulatedDoctors = [
      "Dr. John Doe",
      "Dr. Jane Smith",
      "Dr. Albert Kim",
      "Dr. Emily Watson",
    ];
    setDoctorsList(simulatedDoctors);
  };

  // Booking function to redirect to Practo profile
  const handleBooking = () => {
    if (doctorName) {
      // You would update this to include the scraped Practo profile URL
      window.location.href = `https://www.practo.com/search?doctor=${doctorName}&location=${location}`;
    }
  };

  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        {/* Search Section */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 5,
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Search for Doctors
          </Typography>
          <TextField
            label="Disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            sx={{ width: isBelowMd ? "80%" : "40%" }}
            InputProps={{
                style: {
                  color: 'white', // Sets the text color to white
                },
              }}
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ width: isBelowMd ? "80%" : "40%" }}
            InputProps={{
                style: {
                  color: 'white', // Sets the text color to white
                },
              }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              bgcolor: "#00fffc",
              color: "black",
              transition: "0.3s",
              ":hover": {
                bgcolor: "#00fffc",
                transform: 'scale(1.1)',
                boxShadow: `0px 4px 15px rgba(0, 255, 252, 0.7)`,
              },
            }}
          >
            Search
          </Button>
        </Box>

        {/* Displaying List of Doctors */}
        {doctorsList.length > 0 && (
          <Box
            sx={{
              width: "100%",
              mt: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Doctors Found
            </Typography>
            {doctorsList.map((doctor, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: isBelowMd ? "80%" : "40%",
                  padding: "10px",
                  boxShadow: "5px 5px 15px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                }}
              >
                {doctor}
              </Box>
            ))}
          </Box>
        )}

        {/* Booking Section */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 5,
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Book an Appointment
          </Typography>
          <TextField
            label="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            sx={{ width: isBelowMd ? "80%" : "40%" }}
            InputProps={{
                style: {
                  color: 'white', // Sets the text color to white
                },
              }}
          />
          <Button
            variant="contained"
            onClick={handleBooking}
            sx={{
                bgcolor: "#00fffc",
                color: "black",
                transition: "0.3s",
                ":hover": {
                  bgcolor: "#00fffc",
                  transform: 'scale(1.1)',
                  boxShadow: `0px 4px 15px rgba(0, 255, 252, 0.7)`,
              },
            }}
          >
            Book Appointment
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Booking;
