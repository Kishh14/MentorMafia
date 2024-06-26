import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Header from "./Header";
import { useContext } from "react";
import Context from "../context/Context";

const Room = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const { userId, userName } = useContext(Context);

  const myVideoCall = async (element) => {
    const userID = String(userId);
    const userName2 = userName;
    const appId = 360370830;
    const serverSecret = '37cba6d82b947ad538d2b4a44ed60b5f';

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      userID,
      userName2
    );
    const zCloud = ZegoUIKitPrebuilt.create(kitToken);

    zCloud.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onLeaveRoom: () => {
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
    });
  };

  return (
    <>
      <Header />
      <section className="my-6 md:px-48 lg:px-48 mx-auto">
        <div className="md:shadow-md lg:shadow-md p-3">
          <h3 className="my-1 font-bolder text-xl md:text-2xl lg:text-2xl">
            Guide:
          </h3>
          <p className="my-2 text-sm md:text-xl lg:text-xl">
            * Ensure to allow the camera, and mic persmission in the broswer
          </p>
          <p className="my-2 text-sm md:text-xl lg:text-xl">
            * Click on the black screen to see the controls (in case you're
            unable to see the controls)
          </p>
          <p className="my-2 text-sm md:text-xl lg:text-xl">
            * You can also share the screen while on call
          </p>
        </div>

        <div className="md:w-9/12 lg:w-9/12 shadow-lg rounded-md mx-auto p-10">
          <div ref={myVideoCall} />
        </div>
      </section>
    </>
  );
};

export default Room;
