import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import LoadingPopup from "./LoadingPopup";

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(true); // Initially open the popup

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setLoading(true);
      setPopupOpen(true); // Show popup while loading
      try {
        // Replace with your data fetching logic
        await new Promise((resolve) => setTimeout(resolve, 15000)); // Simulate a 15s delay
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setPopupOpen(false); // Hide popup when data is loaded
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      {loading ? (
        <>
          <Row1 />
          <Row2 />
          <Row3 />
        </>
      ) : (
        <>
          <Row1 />
          <Row2 />
          <Row3 />
        </>
      )}
      <LoadingPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </Box>
  );
};

export default Dashboard;
