import { Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import "../Assets/css/Services.css";

const ServiceCard = styled(Card)(({ theme }) => ({
  maxWidth: "100%",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ServicesSection = () => {
  return (
    <div className="services-section">
      <div className="container">
        <div className="section-heading">
          <Typography variant="h5" component="h3" align="center">
            Services
          </Typography>
        </div>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard>
              <img
                src={require("../Assets/images/istockphoto-1455167765-612x612.jpg")}
                alt="Business Partnership"
                className="service-image img-circle"
              />
              <Typography variant="h6" component="h3" className="service-title">
                Business Partnership
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="service-description"
              >
                Our business partnership services are designed to help you
                expand your reach, increase your revenue, and achieve your
                goals. We work closely with you to identify the right partners,
                negotiate the best terms, and build strong relationships that
                last.
              </Typography>
            </ServiceCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard>
              <img
                src={require("../Assets/images/istockphoto-1224629431-612x612.jpg")}
                alt="Financial Partnership"
                className="service-image img-circle"
              />
              <Typography variant="h6" component="h3" className="service-title">
                Investment Opportunity
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="service-description"
              >
                Our financial partnership services are designed to help you
                secure the funding in your car bussiness , you need to grow and
                succeed. We work with a wide range of partners, including banks,
                investors, and venture capitalists, to identify the best
                financing options for your business.
              </Typography>
            </ServiceCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard>
              <img
                src={require("../Assets/images/risk.jpg")}
                alt="Strategic Partnership"
                className="service-image img-circle"
              />
              <Typography variant="h6" component="h3" className="service-title">
                Strategic Partnership
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="service-description"
              >
                Our strategic partnership services are designed to help you
                develop and execute effective strategies that drive growth and
                innovation. We work closely with you to identify your goals,
                assess your strengths and weaknesses, and develop a customized
                plan that meets your unique needs.
              </Typography>
            </ServiceCard>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ServicesSection;
