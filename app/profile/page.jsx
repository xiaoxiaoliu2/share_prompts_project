"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession();   // get the data
  const [posts, setPosts] = useState([]);   // get the post
  useEffect(() => {
    const fetchPosts = async () => {
      // const response = await fetch(`/api/users/${session?.user.id}/posts`);   // api->users->[id]->posts->route.js
      const response = await fetch('/api/users/[id]/posts');
      const data = await response.json();
      setPosts(data);                       // set the data here
    }
    console.log(posts);
    // if(session?.user.id) fetchPosts();
    fetchPosts();
  }, []);

  const handleEdit = () => { }
  const handleDelete = async () => { }
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}                          // reference the data equals to post here
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile