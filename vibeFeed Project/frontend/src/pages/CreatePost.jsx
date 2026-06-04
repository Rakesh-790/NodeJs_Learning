import React from 'react'
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    axios.post('http://localhost:5000/create-post', formData)
      .then((res) => {
        toast.success("Post Creates Successfully");
        e.target.reset();
        navigate("/feed");
      })
      .catch((err) => {
        toast.error("Failed to Create Post");
        err.res.data.message
      });
  }

  return (
    <section className='create-post-section'>
      <h1>Create Posts</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" name='image' accept='image/*' />
        <input type="text" name='caption' required placeholder='Enter your Caption' />
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default CreatePost