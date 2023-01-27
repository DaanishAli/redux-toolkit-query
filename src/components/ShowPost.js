import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { toast } from "react-toastify";
import { NoiseAwareSharp } from "@mui/icons-material";
import { useGetPostsQuery } from "../features/apiSlice";

export default function ShowPost() {
  const { data: allPosts, isFetching, isError } = useGetPostsQuery();

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h4">
        Posts List
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper", border: 1 }}>
        {allPosts?.map((post, index) => (
          <Box key={index}>
            <ListItem alignItems="flex-start">
              <Link
                to={`/postDetails/${post.id}`}
                style={{
                  width: "100%",
                  color: "black",
                  textDecoration: "none",
                  display: "inline",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <ListItemText
                  primary={post.userName}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {post.post}
                    </Typography>
                  }
                />
              </Link>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Container>
  );
}
