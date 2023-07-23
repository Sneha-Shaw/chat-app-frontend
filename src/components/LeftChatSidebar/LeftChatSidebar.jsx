import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { getUsers, searchUsers, logout } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { routeChange } from "../../utils/routeChange";
import Skeleton from "@mui/material/Skeleton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Close } from "@mui/icons-material";
import AlertComponent from "../../components/AlertComponent/AlertComponent";

const LeftChatSidebar = () => {
  const { data: users, loading } = useSelector((state) => state.user);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // search
  const handleSearch = (e) => {
    dispatch(searchUsers(e.target.value));
  };

  // upload image
  const imageHandler = (e) => {
    const maxSize = 1024 * 1024 * 2;
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (e.target.files[0].size > maxSize) {
      setError(true);
      setMessage("Please select an image less than 2MB");
      return;
    }
    if (!allowedTypes.includes(e.target.files[0].type)) {
      setError(true);
      setMessage("Please select a valid image");
      return;
    }
    if (e.target.files[0]) {
      setNewImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // reset image
  const resetImage = () => {
    setNewImage("");
    setPreviewImage(null);
  };

  return (
    <div className="w-1/4 h-full bg-slate-400">
      {/* navbar with profile icon */}
      <div className="flex flex-row items-center justify-between p-2 bg-slate-400">
        <div className="flex flex-row items-center justify-center">
          <h1 className="ml-2 text-xl font-bold text-white">Messages</h1>
        </div>
        <div className="flex flex-row items-center justify-center w-10 h-10 bg-white rounded-full relative">
          <img
            className="w-9 h-9 rounded-full object-cover"
            // src="https://media.istockphoto.com/id/1300972573/photo/pleasant-young-indian-woman-freelancer-consult-client-via-video-call.jpg?s=612x612&w=0&k=20&c=cbjgWR58DgUUETP6a0kpeiKTCxwJydyvXZXPeNTEOxg="
            src={userInfo?.image}
            alt="dp"
            onClick={() => setShowProfilePopup(!showProfilePopup)}
          />
          <button
            className="absolute -bottom-2 -right-1 w-4 h-4 text-white flex items-center justify-center bg-slate-400 rounded-full"
            onClick={() => setShowEditProfilePopup(!showEditProfilePopup)}
          >
            <PhotoCameraIcon />
          </button>

          {
            // edit profile popup
            showEditProfilePopup && (
              <div className="fixed top-0 right-0 w-full h-full flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-5 shadow-2xl m-auto w-[45%] h-min">
                  {/* edit profile picture */}
                  {/* title and close button */}
                  <div className="p-2 flex justify-between items-center">
                    <h1 className="text-lg font-bold text-gray-700">
                      Edit Profile Picture
                    </h1>
                    <button
                      className="w-6 h-6 text-gray-700"
                      onClick={() => {
                        setShowEditProfilePopup(!showEditProfilePopup);
                      }}
                    >
                      <Close />
                    </button>
                  </div>
                  {/* image */}
                  <div className="flex flex-row items-center justify-center ">
                    <img
                      className="w-52 h-52 rounded-full object-contain border-2"
                      src={previewImage ? previewImage : userInfo?.image}
                      alt="dp"
                    />
                  </div>
                  {error && (
                    <AlertComponent
                      type="Error"
                      message={message}
                      onClose={() => setError(false)}
                    />
                  )}
                  {/* upload button */}
                  <div className="flex items-center justify-between mt-2  w-[40%] mx-auto">
                    <div className="flex items-center justify-center mt-2 relative">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={imageHandler}
                      />
                      <button className="px-4 py-2 bg-blue-400 text-white rounded-lg">
                        Change Picture
                      </button>
                    </div>
                    {/* reset button */}
                    <div className="flex items-center justify-center mt-2">
                      <button
                        className="px-4 py-2 bg-red-400 text-white rounded-lg"
                        onClick={resetImage}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          {showProfilePopup && (
            <div className="absolute top-12 right-0 w-40 h-min bg-white rounded-lg shadow-lg z-50">
              <div className="flex flex-row items-center justify-center w-full p-1">
                <h3 className="text-sm font-bold text-gray-700">
                  Hi {userInfo?.name.split(" ")[0]}!
                </h3>
              </div>
              <div
                className="flex flex-row items-center justify-center w-full p-2 hover:bg-slate-400 cursor-pointer"
                onClick={() => {
                  dispatch(logout());
                  routeChange("/login");
                }}
              >
                <h3 className="text-md font-bold text-gray-700">Logout</h3>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* search bar */}
      <div className="flex flex-row items-center justify-center h-12 bg-white mx-5  rounded-full ">
        <SearchIcon className="w-1/5 h-6 text-gray-700 " />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="w-4/5 h-full px-4 text-gray-700 focus:outline-none  rounded-full bg-transparent"
          onChange={handleSearch}
        />
      </div>
      {/* list of users */}
      <div className="flex flex-col items-center w-full h-[80%] mt-2 overflow-y-auto">
        {loading ? (
          <>
            <Skeleton
              variant="rectangular"
              height={70}
              className="p-3 mx-5 w-[89.7%] rounded-lg cursor-pointer h-16 my-[.1rem]"
            />
            <Skeleton
              variant="rectangular"
              height={70}
              className="p-3 mx-5 w-[89.7%] rounded-lg cursor-pointer h-16 my-[.1rem]"
            />
            <Skeleton
              variant="rectangular"
              height={70}
              className="p-3 mx-5 w-[89.7%] rounded-lg cursor-pointer h-16 my-[.1rem]"
            />
          </>
        ) : (
          users &&
          users?.data
            ?.filter((item) => item._id !== userInfo._id)
            .map((user) => (
              <div
                key={user._id}
                className="flex flex-row items-center justify-start p-3 mx-5 w-[89.7%] rounded-lg cursor-pointer h-16 bg-white border-b-2 border-gray-200 hover:bg-gray-100 my-[.1rem]"
                onClick={() => {
                  routeChange(`/chat/${user._id}`);
                }}
              >
                <div className="flex flex-row items-center justify-center w-12 h-12 bg-gray-400 rounded-full">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user?.image}
                    alt="dp"
                  />
                </div>
                <div className="flex flex-col items-center justify-center ml-2">
                  <h1 className="text-lg font-bold text-gray-700">
                    {user?.name.split(" ")[0]}
                  </h1>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default LeftChatSidebar;
