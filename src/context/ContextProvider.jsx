import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mentorsList, setMentorsList] = useState([]);
  const [mentorUserId, setMentorUserId] = useState("");

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePictureExist, setProfilePictureExist] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [recipientUserId, setRecipientUserId] = useState("");

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        mentorsList,
        setMentorsList,
        mentorUserId,
        setMentorUserId,
        userName,
        setUserName,
        userId,
        setUserId,
        profilePicture,
        setProfilePicture,
        profilePictureExist,
        setProfilePictureExist,
        usersList,
        setUsersList,
        recipientUserId,
        setRecipientUserId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
