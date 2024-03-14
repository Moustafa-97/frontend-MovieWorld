import React, { useRef, useState } from "react";
import axios from "axios";
import { imageToPage64 } from "../../assign/imagetopage64";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../redux/reduxTools/HandleUserLogin";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [editProfile, setEditProfile] = useState(false);

  const dispatch = useDispatch();
  const user: any = useSelector(
    (state: string | object | any) => state.Login.user
  );
  const firstNameEdit: string | any = useRef();
  const lastNameEdit: string | any = useRef();
  const imageEdit: string | any = useRef();
  const [editImage, setEditImage] = useState("");

  const handleInputImage = async (e: {
    target: { files: File[] };
  }): Promise<void> => {
    const file = e.target.files[0];
    if (!file) return;
    const image = await imageToPage64(file);
    setEditImage(image);
  };

  function handleProfileEdit() {
    const profileEdit = {
      firstName: firstNameEdit.current.value,
      lastName: lastNameEdit.current.value,
      image: editImage,
    };

    axios
      .put(`${process.env.REACT_APP_SERVER_DOMAIN}/UpdateProfile`, {
        newData: profileEdit,
        id: user?._id,
      })
      .then((res) => {
        if (res) {
          console.log(res);
          dispatch(userData(res.data.data));
        } else {
          console.log("mmm");
        }
      })
      .catch((err) => console.log(err));
    // const navigate = useNavigate()
    setEditProfile(!editProfile);
  }

  return (
    <>
      <div className="container ">
        <div className="flex flex-col m-auto items-center justify-center h-screen">
          {!editProfile ? (
            <div className="flex w-full ">
              <div className=" w-1/2 m-auto">
                <img
                  className=" w-1/2 m-auto rounded-full object-cover"
                  src={user.image}
                  alt="profile"
                />
              </div>
              <div className="w-1/2 m-auto">
                <div className="p-5">
                  <span>{user.firstName}</span>
                </div>
                <div className="p-5">
                  <span>{user.lastName}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full">
              <div className=" w-1/2 m-auto">
                <div className="w-1/2 rounded-full m-auto">
                  <label
                    htmlFor="image"
                    className="text-start cursor-pointer m-auto"
                  >
                    <div className=" m-auto ">
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e: any) => handleInputImage(e)}
                        ref={imageEdit}
                      />
                      <img
                        src={editImage === "" ? user.image : editImage}
                        alt="ProfilePic"
                        className="w-full h-full m-auto rounded-full"
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="w-1/2 m-auto">
                <div className="p-5">
                  <label htmlFor="firstName" className="text-start" />
                  <input
                    id="firstName"
                    type="text"
                    className="bg-transparent"
                    placeholder={user.firstName}
                    ref={firstNameEdit}
                  />
                </div>
                <div className="p-5">
                  <label htmlFor="lastName" className="text-start" />
                  <input
                    id="lastName"
                    type="text"
                    className="bg-transparent"
                    placeholder={user.lastName}
                    ref={lastNameEdit}
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            {!editProfile ? (
              <button onClick={() => setEditProfile(!editProfile)}>Edit</button>
            ) : (
              <div>
                <button
                  className="px-5"
                  onClick={() => setEditProfile(!editProfile)}
                >
                  Cancel
                </button>
                <button className="px-5" onClick={() => handleProfileEdit()}>
                  Save
                </button>
                <button className="px-5" onClick={() => setEditImage("null")}>
                  Remove Pic
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
