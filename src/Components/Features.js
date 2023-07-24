import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import candles from "../Assets/images/Flexible.jpg";
import candls from "../Assets/images/Com.jpg";
import "../Assets/css/Feature.css";
function Features() {
  return (
    <>
      <Typography
        variant="h5"
        component="h3"
        align="center"
        className="Feature-Title"
      >
        Features
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={{
              p: 2,
              backgroundImage: `url(${candles})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              Width: 500,
              height: 500,
              flexGrow: 1,
            }}
          ></Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={{
              p: 2,

              Width: 500,
              height: 500,
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" className="Flex-Text">
              Flexible Partnership Structures
            </Typography>
            <Grid className="Flex-Text1">
              <Typography
                variant="h6"
                className="Flex-Text2"
                paragraph
                style={{ lineHeight: "1.5" }}
              >
                Ropstam Cars offers a variety of partnership structures to meet
                the unique needs of your business. Whether you're looking for a
                traditional partnership or a more modern approach, we have the
                expertise to guide you in the right direction.{" "}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={{
              p: 2,

              Width: 500,
              height: 500,
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" className="Flex-Text">
              Transparency and Communication
            </Typography>
            <Grid className="Flex-Text1">
              <Typography
                variant="h6"
                className="Flex-Text2"
                paragraph
                style={{ lineHeight: "1.5" }}
              >
                We understand the importance of clear communication and
                transparency in any business partnership. That's why we
                prioritize these values in every aspect of our work, from
                initial consultations to ongoing support.{" "}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              backgroundColor: "yellow",
              backgroundImage: `url(${candls})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
              textAlign: "center",
            }}
          ></div>
        </Grid>
      </Grid>
    </>
  );
}

export default Features;
