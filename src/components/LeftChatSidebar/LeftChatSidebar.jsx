import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { getUsers, searchUsers } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { routeChange } from "../../utils/routeChange";
const LeftChatSidebar = () => {
  const { data: users, loading, error } = useSelector((state) => state.user);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // search
  const handleSearch = (e) => {
    dispatch(searchUsers(e.target.value));
  };

  // // dummy users
  // const users = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "dummy@gmail.com",
  //     image:
  //       "https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     email: "dummy@gmail.com",
  //     image:
  //       "https://media.istockphoto.com/id/1300972573/photo/pleasant-young-indian-woman-freelancer-consult-client-via-video-call.jpg?s=612x612&w=0&k=20&c=cbjgWR58DgUUETP6a0kpeiKTCxwJydyvXZXPeNTEOxg=",
  //   },
  //   {
  //     id: 3,
  //     name: "John Doe",
  //     email: "dummy@gmail.com",
  //     image:
  //       "https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Jane Doe",
  //     email: "dummy@gmail.com",
  //     image:
  //       "https://media.istockphoto.com/id/1300972573/photo/pleasant-young-indian-woman-freelancer-consult-client-via-video-call.jpg?s=612x612&w=0&k=20&c=cbjgWR58DgUUETP6a0kpeiKTCxwJydyvXZXPeNTEOxg=",
  //   },
  // ];
  return (
    <div className="w-1/4 h-full bg-slate-400">
      {/* navbar with profile icon */}
      <div className="flex flex-row items-center justify-between p-2 bg-slate-400">
        <div className="flex flex-row items-center justify-center">
          <h1 className="ml-2 text-xl font-bold text-white">Messages</h1>
        </div>
        <div className="flex flex-row items-center justify-center w-10 h-10 bg-white rounded-full">
          <img
            className="w-9 h-9 rounded-full object-cover"
            src="https://media.istockphoto.com/id/1300972573/photo/pleasant-young-indian-woman-freelancer-consult-client-via-video-call.jpg?s=612x612&w=0&k=20&c=cbjgWR58DgUUETP6a0kpeiKTCxwJydyvXZXPeNTEOxg="
            alt="dp"
          />
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
        {users &&
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
                    {user?.name}
                  </h1>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default LeftChatSidebar;
