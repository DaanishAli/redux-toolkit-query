import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useGetUsersQuery } from "../features/apiSlice";
import { toast } from "react-toastify";
import { addUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: allUsers, isFetching, isError } = useGetUsersQuery();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      toast.error("all fields are required");
    } else if (allUsers.length > 0) {
      const userFound = allUsers.find((user) => {
        return user.email === email && user.password === password;
      });
      if (userFound) {
        toast.success("user found successfully");
        dispatch(addUser(userFound));
        setEmail("");
        setPassword("");
        navigate("/createPost");
      } else {
        toast.error("incorrect email or password");
      }
    } else {
      toast.error("please Sign up first ");
      navigate("/signup");
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoFocus
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
                Log in
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
