import jwtDecode from "jwt-decode";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./Assets/css/style.css";
import UserDashboard from "./pages/Dashboard/User/UserDashboard";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
function App() {
  let isLoggedIn;
  var jwtDecoded;
  let jwt = sessionStorage.getItem("Authorization");

  console.log("jwtjwtjwt: ", jwt);
  if (jwt && jwt !== null) jwtDecoded = jwtDecode(jwt);
  let checkLoginStatus = () => {
    jwt !== null && console.log();
    if (jwtDecoded) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    checkLoginStatus();
    return () => {
      controller.abort();
    };
  }, [jwt]);

  useEffect(() => {
    const controller = new AbortController();
    checkLoginStatus();
    return () => {
      controller.abort();
    };
  }, []);

  jwt !== null && console.log();

  const PrivateRoute = ({ path, ...rest }) => {
    console.log("...rest", rest);
    console.log("jwtDecoded", jwtDecoded);
    checkLoginStatus();
    if (jwtDecoded && isLoggedIn) {
      if (jwtDecoded.user.role === "user") {
        console.log("Islogged in: ", isLoggedIn);
        return isLoggedIn ? (
          <UserDashboard jwtDecoded={jwtDecoded} />
        ) : (
          <Navigate to="/" />
        );
      }
    } else {
      return <Navigate to="/" />;
    }
  };

  const LoginRegisterRedirectCheck = ({ path, ...rest }) => {
    checkLoginStatus();
    console.log("JWTDecoded: ", jwtDecoded);
    return jwtDecoded && isLoggedIn && jwtDecoded.user.role === "user" ? (
      <Navigate to="/dashboard" />
    ) : path === "/user-account" ? (
      <LoginPage />
    ) : path === "/signup" ? (
      <SignupPage />
    ) : (
      <HomePage />
    );
  };

  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={<LoginRegisterRedirectCheck exact path="/" />}
            />
            <Route
              path="/user-account"
              element={
                <LoginRegisterRedirectCheck exact path="/user-account" />
              }
            />
            <Route
              path="/signup"
              element={<LoginRegisterRedirectCheck exact path="/signup" />}
            />

            <Route
              path="/dashboard/*"
              element={<PrivateRoute path="/dashboard/*" />}
            />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;
