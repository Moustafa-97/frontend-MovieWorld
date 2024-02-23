/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { Input as BaseInput, InputProps, inputClasses } from "@mui/base/Input";
import Button from "@mui/material/Button";
import { Grid, OutlinedInput, Snackbar } from "@mui/material";
import Link from "@mui/material/Link";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserLogin((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [loginresp, setLoginres] = useState(Object);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    const { email, password } = userLogin;
    e.preventDefault();
    if (email && password) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
          { user: userLogin },
          // { withCredentials: true }
          // cookies::
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        )
        .then(async (res: any) => {
          console.log(res);
          setLoginres(await res.data);
          setSnackOpen(true);
        })
        .catch((err) => console.log(err));
    } else {
      setSnackOpen(true);
    }
  };
  useEffect(() => {
    if (loginresp.status) {
      localStorage.setItem("user", JSON.stringify(loginresp.user));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [loginresp]);
  //  mui
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: String
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  interface State {
    showPassword: boolean;
    showConfirmPassword: boolean;
  }

  const [values, setValues] = React.useState<State>({
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      {/* Login form */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          maxHeight: "100vh",
          m: "auto",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            width: "100%",
          }}
        >
          <Box
            onSubmit={(e: any): Promise<void> => handleSubmit(e)}
            component="form"
            noValidate
            sx={{
              width: "50%",
              m: "auto",
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Email"
              placeholder="Email"
              type="email"
              name="email"
              value={userLogin.email}
              onChange={handleChange}
            />
            <OutlinedInput
              required
              fullWidth
              placeholder="password"
              id="outlined-password-input"
              type={values.showPassword ? "text" : "password"}
              name="password"
              value={userLogin.password}
              onChange={handleChange}
              endAdornment={
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e: any) => {
                handleSubmit(e);
              }}
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Login
            </Button>
            {userLogin.email && userLogin.password ? (
              <Snackbar
                message={loginresp.message}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackOpen}
                onClose={handleClose}
              />
            ) : (
              <Snackbar
                message={"Please fill out all fields"}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackOpen}
                onClose={handleClose}
              />
            )}
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <p
                  onClick={() => navigate("/signup")}
                  // variant="body2"
                  style={{
                    textDecoration: "none",
                    // ":hover": { fontWeight: "600" },
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

// const InputRoot = styled("div")(
//   ({ theme }) => `
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-weight: 400;
//   border-radius: 5px;
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
//   background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//   box-shadow: 0px 2px 4px ${
//     theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
//   };
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width:100%;

//   &.${inputClasses.focused} {
//     border-color: ${blue[400]};
//     box-shadow: 0 0 0 0 ${
//       theme.palette.mode === "dark" ? blue[600] : blue[200]
//     };
//   }

//   &:hover {
//     border-color: ${grey[800]};
//   }

//   // firefox
//   &:focus-visible {
//     outline: 0;
//   }
// `
// );

// const InputElement = styled("input")(
//   ({ theme }) => `
//   font-size: 0.875rem;
//   font-family: inherit;
//   font-weight: 400;
//   line-height: 1.5;
//   flex-grow: 1;
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//   background: inherit;
//   border: none;
//   border-radius: inherit;
//   padding: 8px 12px;
//   outline: 0;
// `
// );

const IconButton = styled(Button)(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[700]};
  `
);
// const Grid = styled('div')(
//   ({ theme }) => `
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border: none;
//   background: inherit;
//   cursor: pointer;
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[700]};
//   `
// );
