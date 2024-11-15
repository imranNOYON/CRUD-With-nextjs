"use client"
import React, { useState, useEffect } from 'react';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';

// Fetch topics function
const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topics');
    }

    return await res.json(); // Make sure this returns an object with a `topics` array
  } catch (error) {
    console.log('Error loading:', error);
    return { topics: [] }; // Return a default structure in case of an error
  }
};

// TopicsList component
const TopicsList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const loadTopics = async () => {
      const data = await getTopics();
      setTopics(data.topics || []); // Handle case where data.topics might be undefined
    };

    loadTopics();
  }, []); // Empty dependency array to run effect once

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={t._id}/>
            <Link href={`/editTopic/${t._id}`}>
            <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
