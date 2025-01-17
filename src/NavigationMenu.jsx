import React, { useState } from "react";
import { Box, IconButton, Typography, Button, Drawer } from "@mui/material";
import { Link as ScrollLink } from "react-scroll"; // Import the ScrollLink component from react-scroll
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import WorkIcon from "@mui/icons-material/Work";
import BookIcon from "@mui/icons-material/Book";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const menuItems = [
  { id: "home", icon: <HomeIcon />, label: "Home" },
  { id: "about", icon: <InfoIcon />, label: "About" },
  { id: "projects", icon: <WorkIcon />, label: "Projects" },
  { id: "blog", icon: <BookIcon />, label: "Blogs" },
  { id: "contact", icon: <ContactMailIcon />, label: "Contact" },
];

export default function Navigation() {
  const [selected, setSelected] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "10%",
        right: "0vw",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        padding: "20px",
        zIndex: 1000, // Add z-index for layering
      }}
    >
      {/* Mobile Menu Button */}
      <Box
        sx={{
          display: { xs: "block", md: "none" }, // Show this button only on mobile (xs screen)
          marginBottom: "20px",
        }}
      >
        <Button
          onClick={handleMobileMenuToggle}
          sx={{
            backgroundColor: "#ff6347",
            color: "white",
            "&:hover": {
              backgroundColor: "#ff6347",
            },
          }}
        >
          Menu
        </Button>
      </Box>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          display: { xs: "block", md: "none" }, // Only show on mobile
        }}
      >
        <Box sx={{ padding: "20px" }}>
          {menuItems.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id} // The `to` prop should match the ID of the target section in your page
              smooth={true} // Enable smooth scrolling
              duration={500} // Set the scroll duration
              offset={-70} // Optional: Adjust offset for fixed header (if needed)
              onClick={() => {
                handleSelect(item.id);
                setIsMobileMenuOpen(false); // Close the menu after selecting an item
              }}
            >
              <Button
                fullWidth
                sx={{
                  marginBottom: "10px",
                  backgroundColor: selected === item.id ? "#ff6347" : "transparent",
                  color: selected === item.id ? "white" : "black",
                  "&:hover": {
                    backgroundColor: "#ff6347",
                    color: "white",
                  },
                }}
              >
                {item.label}
              </Button>
            </ScrollLink>
          ))}
        </Box>
      </Drawer>

      {/* Desktop Navigation (Icon Buttons) */}
      <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", alignItems: "flex-end" }}>
        {menuItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: "10px",
              position: "relative",
            }}
          >
            {/* Text with Background Animation */}
            <Box
              className="text-container"
              sx={{
                position: "absolute",
                left: "-110px", // Position the text
                background: "rgba(255, 99, 71, 0.8)",
                borderRadius: "20px",
                padding: selected === item.id ? "5px 10px" : "0px",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "right",
                transition: "width 0.3s ease, padding 0.3s ease, transform 0.3s ease", // Add transition for transform
                width: selected === item.id ? "100px" : "0px", // Show text when selected
                whiteSpace: "nowrap",
                overflow: "hidden",
                transform: selected === item.id ? "scaleX(1)" : "scaleX(0)", // Expand from right to left
                transformOrigin: "right center", // Start the expansion from the right
              }}
            >
              {item.label}
            </Box>

            {/* Icon Button */}
            <ScrollLink
              to={item.id} // The `to` prop should match the ID of the target section in your page
              smooth={true} // Enable smooth scrolling
              duration={500} // Set the scroll duration
              offset={-70} // Optional: Adjust offset for fixed header (if needed)
              onClick={() => handleSelect(item.id)} // Update the selected state on click
            >
              <IconButton
                sx={{
                  color: selected === item.id ? "#ff6347" : "white",
                  backgroundColor: selected === item.id ? "rgba(255, 99, 71, 0.2)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 99, 71, 0.2)",
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </ScrollLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
