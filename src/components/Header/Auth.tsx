import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Auth = () => {
  const [user, loading] = useAuthState(auth);
  // const nameAsAvata = user?.displayName?.split(" ");

  return (
    <div className="flex justify-between items-center gap-10">
      {user && !loading ? (
        <Link to={"/profile"} className="avatar">
          <div className="w-10 md:w-12 rounded-full ring ring-[#be233d] ring-offset-base-400 ring-offset-5">
            <img src={`${user.photoURL}`} alt={`${user.displayName} `} />
          </div>
        </Link>
      ) : (
        <button className="btn btn-outline text-primary">
          <NavLink to={"/auth"}>Login</NavLink>
        </button>
      )}
    </div>
  );
};

export default Auth;
