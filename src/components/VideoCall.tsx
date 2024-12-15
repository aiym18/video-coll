import { FC } from "react";

import uuid4 from "uuid4";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const APP_ID = import.meta.env.VITE_APP_ID!;
const SERVER_SECRET = import.meta.env.VITE_SERVER_SECRET!;

const randomId = () => {
  const id = uuid4();
  return id;
};
console.log(randomId);
console.log(randomId);
console.log(randomId);

// function randomID(len: number) {
//   let result = "";
//   if (result) return result;
//   var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// let id = uuid4();
// console.log(id);

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const VideoCall: FC = () => {
  const roomID = getUrlParams().get("roomID") || randomId();
  let myMeeting = async (element: any) => {
    // generate Kit Token
    const appID = +APP_ID;
    const serverSecret = SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomId(),
      "Aiym"
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };
  return (
    <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>
  );
};

export default VideoCall;
