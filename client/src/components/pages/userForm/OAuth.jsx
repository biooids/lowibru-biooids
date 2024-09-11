import React from "react";
import { Button } from "flowbite-react";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../../firebase.js";

function OAuth() {
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        gradientDuoTone="pinkToOrange"
        className="w-full "
        onClick={handleGoogleClick}
      >
        Google
      </Button>
    </div>
  );
}

export default OAuth;
