import { Button, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "../Assets/css/Home.css";
import Contact from "../Components/Contact";
import Features from "../Components/Features";
import Header from "../Components/Header";
import ServicesSection from "../Components/Services";

function HomePage() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const navigate = useNavigate(); // Declare the navigate function using useNavigate

  return (
    <>
      <Header />
      <Grid component={Container} className="Main">
        <Grid className="containerH">
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            textAlign={"center"}
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4">Ropstam Cars Partners</Typography>
            </Grid>
            <Grid item className="Text2">
              <Typography className="Text3" variant="h6">
                Ropstam Cars is your trusted partner in bringing your Life to
                the next level. Our services are designed to help you achieve
                your goals by providing expert guidance and support.<br/>Revolutionize Your Ride: Upgrade Your Life with Us
              </Typography>
            </Grid>
            <Grid item>
            
            </Grid>
          </Grid>
        </Grid>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 9 }}
        >
          <ServicesSection />
        </motion.div>
        <Features />
        <Contact />
      </Grid>
    </>
  );
}

export default HomePage;
