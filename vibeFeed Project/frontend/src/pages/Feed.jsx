import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then((res) => {
                setPosts(res.data.posts)
            });
    }, []);

    return (
        <section className='feed-section'>
            {console.log(posts)}
            {
                posts.length > 0 ? (
                    posts.map((post) => {
                        return (
                            <div key={post._id}
                                className='post-card'>
                                <img src={post.imageUrl} alt={post.caption} />
                                <p>{post.caption}</p>
                            </div>
                        )
                    })
                ) : (
                    <h3>No Posts Available</h3>
                )
            }

        </section>
    )
}

export default Feed;