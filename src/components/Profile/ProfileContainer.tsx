import React, { ReactNode, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const ProfileContainer = ({ children }: { children: ReactNode }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []); // eslint-disable-line
  return <section className="px-2 py-5">{children}</section>;
};

export default ProfileContainer;
