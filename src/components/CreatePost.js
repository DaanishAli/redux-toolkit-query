import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddNewPostMutation } from "../features/apiSlice";

const theme = createTheme();

export default function CreatePost() {
  const navigate = useNavigate();
  const { email, userName } = useSelector((state) => state.user.user);
  const [post, setPost] = React.useState("");
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (post === "") {
      toast.error("please write a post");
    } else {
      try {
        await addNewPost({ userName, email, post }).unwrap();
        setPost("");
        toast.success("post have been submitted successfully");
        navigate("/showPost");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  };
  React.useEffect(() => {
    if (!email || !userName) {
      toast.error("please login first");
      navigate("/login");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

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
                Create Post
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
                width="100%"
              >
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Post
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
