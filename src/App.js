import { useGetPostsQuery } from "./features/apiSlice";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./components/CreatePost";
import ShowPost from "./components/ShowPost";
import PostDetails from "./components/PostDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1> Home Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/showPost" element={<ShowPost />} />
          <Route path="/postDetails/:postId" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
