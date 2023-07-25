import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/css/LoginPage.css";
import { Web3Provider } from "@ethersproject/providers";
import ConnectionModal from "../Components/Modals/ConnectionModal";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Ropstam Cars{" "}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [connectedAddress, setConnectedAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleShowConnectionModal = () => {
    setShowModal(true);
  };

  const handleCloseConnectionModal = () => {
    console.log("Handle close button clicked,");
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "") {
      const variant = "error";
      enqueueSnackbar("Please fill in email field", { variant });
    } else if (password === "") {
      const variant = "error";
      enqueueSnackbar("Please fill in password field", { variant });
    } else if (!isConnected) {
      const variant = "error";
      enqueueSnackbar("Please connect to Metamask to continue", { variant });
      handleShowConnectionModal();
    } else {
      axios
        .post(`/login`, {
          emailAddress: email,
          password: password,
          walletAddress: connectedAddress,
        })
        .then((response) => {
          console.log("Response from login: ", response);
          response.data.token &&
            sessionStorage.setItem("Authorization", response.data.token, {});
          let variant = "success";
          enqueueSnackbar("Logged in successfully", { variant });
          navigate(0);
        })
        .catch((error) => {
          console.log("Error from login: ", error);
          let variant = "error";
          enqueueSnackbar(error.response.data.message, { variant });
        });
    }
  };

  useEffect(() => {
    console.log("Authorization: ", sessionStorage.getItem("Authorization"));
    if (sessionStorage.getItem("Authorization")) {
      window.location.reload(false);
    }
  }, []);

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setConnectedAddress(address.toLowerCase());
        setIsConnected(true);
        handleCloseConnectionModal(); // Hide the modal after successful connection
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    } else {
      console.error("Metamask not detected");
    }
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      setConnectedAddress(accounts[0].toLowerCase() || "");
      setIsConnected(accounts.length > 0);
    };

    const checkMetamaskConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          setIsConnected(accounts.length > 0);
          setConnectedAddress(accounts[0].toLowerCase() || "");
          if (!accounts.length) {
            handleShowConnectionModal();
          }
        } catch (error) {
          console.error("Error checking Metamask connection:", error);
        }
      }
    };

    checkMetamaskConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  useEffect(() => {
    // Run the logic whenever the address changes
    console.log("Address updated:", connectedAddress);
    // Call any additional functions or perform actions based on the address change
    // This will be triggered after the initial connection as well
  }, [connectedAddress]);

  return (
    <div>
      <Grid container className="login-page">
        <Grid
          item
          className="login-page-leftSide"
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: "no-repeat",

            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar className="icon" sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" className="login-title " variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                className="mail"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                className="login-button"
                fullWidth
                variant="contained"
                // onClick={handleSignIn}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                <Grid item>
                  <Link
                    href="/signup"
                    variant="body2"
                    style={{ textDecoration: "none", color: "#00AEAE" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ConnectionModal
        show={showModal}
        handleClose={handleCloseConnectionModal}
        connectToMetamask={connectToMetamask}
      />
    </div>
  );
};

export default LoginPage;
