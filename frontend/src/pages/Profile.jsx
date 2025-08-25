import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

const Profile = () => {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">{currentUser.username} </h1>
      <form className="flex flex-col gap-4">
        <input
          
          type="file"
          
          hidden
          accept="image/*"
        />
        <img
          src={currentUser?.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        {/* <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p> */}
        <input
          type="text"
          placeholder="username"
         
          id="username"
          className="border p-3 rounded-lg"
         
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          
          className="border p-3 rounded-lg"
          
        />
        <input
          type="password"
          placeholder="password"
         
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
         
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
          {/* {loading ? "Loading..." : "Update"} */}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span 
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
