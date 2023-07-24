import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
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
        Scytalelabs{" "}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const SignupPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [connectedAddress, setConnectedAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState("");
  const [userType, setUserType] = useState("user");

  const handleShowConnectionModal = () => {
    setShowModal(true);
  };

  const handleCloseConnectionModal = () => {
    console.log("Handle close button clicked,");
    setShowModal(false);
  };

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setConnectedAddress(address);
        setWalletAddress(address.toLowerCase());
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
      setConnectedAddress(accounts[0] || "");
      setWalletAddress(accounts[0].toLowerCase() || "");
      setIsConnected(accounts.length > 0);
    };

    const checkMetamaskConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          setIsConnected(accounts.length > 0);
          setConnectedAddress(accounts[0] || "");
          setWalletAddress(accounts[0].toLowerCase() || "");
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

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "") {
      const variant = "error";
      enqueueSnackbar("Please fill in name field", { variant });
    } else if (email === "") {
      const variant = "error";
      enqueueSnackbar("Please fill in email field", { variant });
    } else if (number === "") {
      const variant = "error";
      enqueueSnackbar("Please fill in number field", { variant });
    } else if (!isConnected) {
      const variant = "error";
      enqueueSnackbar("Please connect to Metamask to continue", { variant });
      handleShowConnectionModal();
    } else {
      const data = {
        fullName: name,
        phoneNumber: number,
        emailAddress: email,
        walletAddress: walletAddress,
        role: userType,
      };
      console.log("Data: ", data);
      axios
        .post(`/register`, data)
        .then((response) => {
          console.log("Response from login: ", response);
          response.data.token &&
            sessionStorage.setItem("Authorization", response.data.token, {});
          const variant = "success";
          enqueueSnackbar("User sign up succesfully", { variant });
          navigate(0);
        })
        .catch((error) => {
          console.log("Error from login: ", error);
          const variant = "error";
          enqueueSnackbar(error.response.data.message, { variant });
        });
    }
  };
  useEffect(() => {
    console.log("Authorization: ", sessionStorage.getItem("Authorization"));
    if (sessionStorage.getItem("Authorization")) {
      window.location.reload(false);
    }
    // sessionStorage.removeItem("Authorization");
  }, []);

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
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                className="name"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                className="mail"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <TextField
                className="address"
                margin="normal"
                required
                disabled
                fullWidth
                id="address"
                label="Wallet Address"
                value={walletAddress}
                name="address"
                autoComplete="address"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="number"
                label="Number"
                type="number"
                id="number"
                autoComplete="number"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <FormControl className="d-flex ">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="d-flex"
                >
                  Type
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={userType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="User"
                  />
                  <FormControlLabel
                    value="notary"
                    control={<Radio />}
                    label="Notary"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                className="login-button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign UP
              </Button>
              <Grid item>
                <Link
                  href="/user-account"
                  variant="body2"
                  style={{ textDecoration: "none", color: "#00AEAE" }}
                >
                  {"Already have an account? Login"}
                </Link>
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

export default SignupPage;
