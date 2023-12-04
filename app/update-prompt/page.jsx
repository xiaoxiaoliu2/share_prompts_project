'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        // const response = await fetch('api/prompt/${promptId')
        const response = await fetch('/api/prompt');
        if(!response.ok) {
          throw new Error(`Failed to fetch prompt details. Status: $(response.status)`)
        }
        const data = await response.json();
        console.log('Fetched data: ', data)
        setPost((prevPost) => ({
          prompt: data[0].prompt || prevPost.prompt,
          tag: data[0].tag || prevPost,
        }));
      } catch (error) {
        console.log('Error fetching prompt details: ', error);
      }
    };
    // if (promptId) getPromptDetails()
    getPromptDetails()
    // }, [promptId])
  }, [])

  const updatePrompt = async (e) => {
    e.preventDefault();   // prevent the browser to reload the create behavior
    setSubmitting(true);
    // if(!promptId) return alert('Prompt ID not found')
    try {
      // const response = await fetch('/api/prompt/{promptId}', {
      const response = await fetch('/api/prompt/[id]', {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }

  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt