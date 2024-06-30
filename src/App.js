import Login from "./components/Login";
import Signup from "./components/Singup";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Account from "./components/Account";
import { useContext, useEffect } from "react";
import { account, database, storage } from "./lib/appwrite";
import Mentors from "./components/Mentors";
import Room from "./components/Room";
import Context from "./context/Context";

function App() {
  const {
    setIsLoggedIn,
    setUserName,
    setUserId,
    setProfilePicture,
    setProfilePictureExist,
    usersList,
    setUsersList,
    setMentorsList,
  } = useContext(Context);

  useEffect(() => {
    const filteredMentors = usersList.filter(
      (item) => item.accountType === "Mentor"
    );
    const promises = filteredMentors.map(async (mentor) => {
      const imageUrl = await storage.getFilePreview(
        "660d64d1496e76a7e4aa",
        mentor.$id
      );
      return { ...mentor, image: imageUrl };
    });

    Promise.all(promises).then((processedMentors) => {
      setMentorsList(processedMentors);
    });
  }, [usersList]);

  const getProfilePicture = () => {
    const accountProm = account.get();
    accountProm.then(
      async function (response) {
        const promise = await storage.getFilePreview(
          "660d64d1496e76a7e4aa",
          response.$id
        );
        setProfilePicture(promise);
        fetch(promise).then((r) => {
          if (r.status !== 404) {
            setProfilePictureExist(true);
          } else {
            setProfilePictureExist(false);
          }
        });
      },
      function (err) {
        // console.error(err);
        setProfilePictureExist(false);
      }
    );
  };

  const getAccount = () => {
    const promise = account.get();
    promise.then(
      function (response) {
        setUserId(response.$id);
        setUserName(response.name);
        setIsLoggedIn(true);
      },
      function (err) {
        // console.error(err);
      }
    );
  };

  const getUsersList = () => {
    const promise = database.listDocuments(
      "660cf234f3a008730036",
      "660cf2ad06380c29d762"
    );
    promise.then(
      function (response) {
        setUsersList(response.documents);
      },
      function (err) {
        // console.error(err);
      }
    );
  };

  useEffect(() => {
    getProfilePicture();
    getAccount();
    getUsersList();
  }, [
    setProfilePicture,
    setProfilePictureExist,
    setUserId,
    setUserName,
    setIsLoggedIn,
    setUsersList,
  ]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/account" element={<Account getAccount={getAccount} />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/room/:roomId" element={<Room />}></Route>
    </Routes>
  );
}

export default App;
