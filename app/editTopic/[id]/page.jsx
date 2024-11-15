import EditTopicForm from '@/components/EditTopicForm'
import React from 'react'
export const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }
    return await res.json(); // Return the full response object, assuming it contains { topic: { ... } }
  } catch (error) {
    console.error('Error fetching topic:', error);
    return { topic: null }; // Return a default structure if there's an error
  }
};
const page = async({params}) => {
  const {id}=params
  const{topic}= await getTopicById(id)
  const {title,description}=topic
  return (
    <div>
        <EditTopicForm id={id} title={title} description={description} />
    </div>
  )
}

export default page