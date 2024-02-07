import React, { useEffect, useState } from "react";
import { Box, Container, display, styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { Input as BaseInput, InputProps, inputClasses } from "@mui/base/Input";
import Button from "@mui/material/Button";
import {
  Grid,
  OutlinedInput,
  InputAdornment,
  CssBaseline,
  Tooltip,
  Avatar,
} from "@mui/material";
import Link from "@mui/material/Link";
import axios from "axios";
import { imageToPage64 } from "../../assign/imagetopage64";
import { useNavigate } from "react-router-dom";

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { slots, ...other } = props;
  return (
    <BaseInput
      slots={{
        root: InputRoot,
        input: InputElement,
        ...slots,
      }}
      {...other}
      ref={ref}
    />
  );
});

export default function Signup() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<{
    firstName: string;
    lastName: string;
    image: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [userSignup, setUserSignup] = useState(Object);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleInputImage = async (e: {
    target: { files: File[] };
  }): Promise<void> => {
    const file = e.target.files[0];
    if (!file) return;
    const image = await imageToPage64(file);

    setNewUser((pre: any) => {
      return {
        ...pre,
        image: image,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const { firstName, lastName, email, password, confirmPassword } = newUser;
    e.preventDefault();
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        axios
          .post(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, { newUser: newUser })
          .then((res) => setUserSignup(res))
          .catch((err) => console.log(err.response.data));
      } else {
        console.log("password did not match");
      }
    } else {
      console.log("fadia");
    }
  };
  useEffect(() => {
    if (userSignup.status) {
      navigate("/login");
    }
  }, [userSignup]);

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
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      {/* Signup form */}
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
            m: "auto",
          }}
        >
          <Box
            onSubmit={(e: any): void => handleSubmit(e)}
            component="form"
            noValidate
            sx={{
              width: "50%",
              height: "100%",
              m: "auto",
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              component="label"
              sx={{ background: "none" }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e: any) => handleInputImage(e)}
              />
              <Avatar src={newUser.image} />
            </Button>
            <TextField
              fullWidth
              required
              id="outlined-required"
              type="text"
              label="First Name"
              placeholder="First Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              value={newUser.lastName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Email"
              placeholder="Email"
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
            />
            <OutlinedInput
              required
              fullWidth
              id="outlined-adornment-password"
              placeholder="password"
              type={values.showPassword ? "text" : "password"}
              name="password"
              value={newUser.password}
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
            <OutlinedInput
              required
              fullWidth
              placeholder="Confirm Password"
              id="outlined-password-input"
              type={values.showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={handleChange}
              endAdornment={
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showConfirmPassword ? (
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
              onClick={(e: any) => handleSubmit(e)}
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Sign Up
            </Button>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{
                    // color: "#000",
                    textDecoration: "none",
                    ":hover": { fontWeight: "600" },
                  }}
                >
                  {"You have an account? Login"}
                </Link>
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

const InputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 5px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;

  &.${inputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 0 ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }
 
  &:hover {
    border-color: ${grey[800]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const InputElement = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`
);

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
