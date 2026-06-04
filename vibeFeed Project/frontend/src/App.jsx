import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Feed from './pages/Feed';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/feed' element={<Feed />} />
        </Routes>
      </Router>
    </>
  )
}

export default App