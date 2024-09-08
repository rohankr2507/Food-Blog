import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Search from "./components/Search";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="search/post/:title" element={<Post />} />
            <Route path="post/:title" element={<Post />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
