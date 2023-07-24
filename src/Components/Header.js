import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { teal } from "@mui/material/colors";
import "../Assets/css/HomeHeader.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar
          className="AppHeader"
          sx={{ justifyContent: "space-between", backgroundColor: teal }}
        >
          <Box sx={{ flex: 1 }} />
          <Typography
            variant="h6"
            underline="none"
            color="inherit"
            href="/premium-themes/onepirate/"
            sx={{ fontSize: 24 }}
          >
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Ropstam Cars
            </Link>
          </Typography>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              className="m-3"
              to="/user-account"
              style={{
                color: "inherit",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              {"Sign In"}
            </Link>
            <Link
              to="/signup"
              className="m-3"
              style={{
                color: "inherit",
                variant: "h6",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              {"Sign Up"}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
