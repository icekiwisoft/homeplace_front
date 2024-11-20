import React, { FormEvent, useContext, useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software Developer',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Profile updated!');
  };
  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-semibold mb-4'>Profile</h1>
      <div className='mb-4'>
        <label className='block mb-2' htmlFor='name'>
          Name:
          <input
            type='text'
            name='name'
            id='name'
            value={profile.name}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </label>
      </div>
      <div className='mb-4'>
        <label className='block mb-2' htmlFor='email'>
          Email:
          <input
            type='email'
            name='email'
            id='email'
            value={profile.email}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </label>
      </div>
      <div className='mb-4'>
        <label className='block mb-2' htmlFor='bio'>
          Bio:
          <textarea
            name='bio'
            id='bio'
            value={profile.bio}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            rows={3}
          />
        </label>
      </div>
      <button
        onClick={handleSave}
        className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'
      >
        Save Profile
      </button>
    </div>
  );
}
