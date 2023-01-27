import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, useAddNewUserMutation } from "../features/apiSlice";

export default function SignUp() {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { data: allUsers, isFetching, isError } = useGetUsersQuery();
  const [addNewUser, { isLoading }] = useAddNewUserMutation();
  const canSave = [userName, email, password].every(Boolean) && !isLoading;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName === "" || email === "" || password === "") {
      toast.error("all fields are required");
    } else if (allUsers.length > 0) {
      const userFound = allUsers.find((user) => {
        return user.userName === userName || user.email === email;
      });
      if (userFound) {
        toast.error("user already exist");
      } else if (canSave) {
        try {
          await addNewUser({ userName, email, password }).unwrap();
          setUserName("");
          setEmail("");
          setPassword("");
          toast.success("account have been created successfully");
          navigate("/login");
        } catch (err) {
          console.error("Failed to save the post: ", err);
        }
      }
    } else {
      try {
        await addNewUser({ userName, email, password }).unwrap();
        setUserName("");
        setEmail("");
        setPassword("");
        toast.success("account have been created successfully");
        navigate("/login");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  };
  if (isFetching) return <h1>loading...</h1>;
  else if (isError) return <h1>an error occured...</h1>;

  return (
    <Container maxWidth="sm">
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                margin="normal"
                required
                fullWidth
                label="User Name"
                autoFocus
              />
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                label="Email Address"
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                label="Password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
