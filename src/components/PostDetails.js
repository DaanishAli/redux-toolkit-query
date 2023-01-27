import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddNewCommentMutation,
  // useGetCommentQuery,
} from "../features/apiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const user = useSelector((state) => state.user.user);
  // console.log(user.email);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openComment, setOpenComment] = React.useState(false);
  const [post, setPost] = React.useState("");
  const [comment, setComment] = React.useState("");
  const { data: individualPost } = useGetPostQuery(postId);
  console.log(individualPost);
  // const { data: individualComment } = useGetCommentQuery(postId);
  console.log();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [addNewComment] = useAddNewCommentMutation();

  // console.log("individualPost:", individualPost);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleClickOpenComment = () => {
    setOpenComment(true);
  };
  const handleCloseComment = () => {
    setOpenComment(false);
  };
  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    try {
      await updatePost({ post, individualPost }).unwrap();
      handleCloseEdit();
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  };
  const handleSubmitDelete = async () => {
    try {
      await deletePost(individualPost).unwrap();
      handleCloseDelete();
      toast.success("post have been deleted successfully");
      navigate("/showPost");
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  };
  const handleSubmitComment = async (event) => {
    event.preventDefault();

    try {
      await addNewComment({
        individualPost,
        comment,
        userName: user.userName,
      }).unwrap();
      handleCloseComment();
      toast.success("comment has been posted successfully");
      // navigate("/showPost");
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  };
  React.useEffect(() => {
    if (!user.email || !user.userName) {
      toast.error("please login first");
      navigate("/login");
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} component={Paper} elevation={6} square>
          <Typography component="h1" variant="h5" align="center">
            Post Details
          </Typography>
          <Box
            sx={{
              my: 8,
              mx: 4,
              border: 1,
              p: 2,
              borderRadius: 2,
            }}
          >
            <Box wisth="100%" display="flex" justifyContent="space-between">
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>
                  Author: {individualPost?.userName}
                </Typography>
              </Box>
              <Box>
                <Tooltip
                  placement="top"
                  title="Edit"
                  onClick={handleClickOpenEdit}
                >
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  placement="top"
                  title="Delete"
                  onClick={handleClickOpenDelete}
                >
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Typography>{individualPost?.post}</Typography>
            <Box display="flex" justifyContent="end">
              <Button onClick={handleClickOpenComment}>comment</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* ----------- Edit modal-------------- */}
      <Dialog
        component="form"
        onSubmit={handleSubmitUpdate}
        fullWidth={true}
        minwidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit your Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={individualPost?.post}
            onChange={(e) => setPost(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button autoFocus type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* ----------- Delete modal-------------- */}
      <Dialog
        fullWidth={true}
        minwidth="sm"
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do You want to delete post?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDelete}>No</Button>
          <Button autoFocus onClick={() => handleSubmitDelete()}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* ----------- Comment modal-------------- */}
      <Dialog
        component="form"
        onSubmit={handleSubmitComment}
        fullWidth={true}
        minwidth="sm"
        open={openComment}
        onClose={handleCloseComment}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Write your comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            multiline
            minRows={1}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseComment}>Cancel</Button>
          <Button autoFocus type="submit">
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PostDetails;
