import React, { useState, useEffect } from "react";
import { Box, IconButton, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import WorkIcon from "@mui/icons-material/Work";
import BookIcon from "@mui/icons-material/Book";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link as ScrollLink } from "react-scroll"; // Import the ScrollLink component from react-scroll

const menuItems = [
  { id: "home", icon: <HomeIcon />, label: "Home" },
  { id: "about", icon: <InfoIcon />, label: "About" },
  { id: "projects", icon: <WorkIcon />, label: "Projects" },
  { id: "blog", icon: <BookIcon />, label: "Blogs" },
  { id: "contact", icon: <ContactMailIcon />, label: "Contact" },
];

export default function Navigation() {
  const [selected, setSelected] = useState("home");

  const handleSelect = (id) => {
    setSelected(id);
  };

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      menuItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const elementPosition = element.offsetTop;
          const elementHeight = element.offsetHeight;

          if (scrollPosition >= elementPosition - 80 && scrollPosition < elementPosition + elementHeight - 80) {
            setSelected(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      {/* Desktop Navigation (Icon Buttons) */}
      <Box sx={{ display: { xs: "none", md: "flex" }, position: "fixed", top: "10%", right: "0vw", flexDirection: "column", alignItems: "flex-end", padding: "20px", zIndex: 1000 }}>
        {menuItems.map((item) => (
          <Box key={item.id} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "10px", position: "relative" }}>
            {/* Text with Background Animation */}
            <Box
              className="text-container"
              sx={{
                position: "absolute",
                left: "-110px",
                background: "rgba(255, 99, 71, 0.8)",
                borderRadius: "20px",
                padding: selected === item.id ? "5px 10px" : "0px",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "right",
                transition: "width 0.3s ease, padding 0.3s ease, transform 0.3s ease",
                width: selected === item.id ? "100px" : "0px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                transform: selected === item.id ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "right center",
              }}
            >
              {item.label}
            </Box>

            <ScrollLink to={item.id} smooth={true} duration={500} offset={-70} onClick={() => handleSelect(item.id)}>
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

      {/* Mobile Bottom Navigation */}
      <Box sx={{ display: { xs: "block", md: "none" }, position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
        <BottomNavigation
          value={selected}
          onChange={(event, newValue) => handleSelect(newValue)}
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            borderTop: "2px solid rgba(255, 99, 71, 0.8)",
          }}
        >
          {menuItems.map((item) => (
            <BottomNavigationAction
              key={item.id}
              label={item.label}
              value={item.id}
              icon={item.icon}
              sx={{
                color: selected === item.id ? "#ff6347" : "black",
                "&.Mui-selected": {
                  color: "#ff6347",
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Box>
    </Box>
  );
}
