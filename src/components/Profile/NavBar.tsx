import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { CiMenuFries } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type componentTypes = {
  onClickDownload: () => void;
  onClickUploads: () => void;
  onClickBookmakrs: () => void;
};
const NavBar = ({
  onClickUploads,
  onClickBookmakrs,
  onClickDownload,
}: componentTypes) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const toggleProfileBar = () => {
    document.getElementById("profile_navbar")?.classList.toggle("open");
  };

  const handleSignOut = () => {
    toast.info("Logged out successful");
    signOut(auth);
    navigate("/");
  };
  return (
    <>
      <button
        className="md:hidden block btn btn-outline mx-1 mt-1 relative z-20"
        onClick={toggleProfileBar}
      >
        <CiMenuFries />
      </button>
      <section className="profile_navbar" id="profile_navbar">
        <div className="pb-14 flex flex-col justify-center items-center">
          {loading ? (
            <div className="w-32 h-32 rounded-full skeleton"></div>
          ) : (
            <div className="avatar rounded-full drop-shadow-lg shadow-md">
              <div className="w-32 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                <img src={`${user?.photoURL}`} alt={`${user?.displayName}`} />
              </div>
            </div>
          )}
          {loading ? (
            <div className="skeleton w-full h-5 mt-3"></div>
          ) : (
            <>
              <h2 className="font-bold text-3xl mt-3">{user?.displayName}</h2>
              <p>{user?.phoneNumber}</p>
            </>
          )}
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="skeleton w-full h-10"></div>
            <div className="skeleton w-full h-10"></div>
            <div className="skeleton w-full h-10"></div>
          </div>
        ) : (
          <ul className="space-y-5">
            <button
              className="btn w-full drop-shadow-lg shadow-md"
              onClick={onClickUploads}
            >
              Uploads
            </button>
            <button
              className="btn w-full drop-shadow-lg shadow-md"
              onClick={onClickDownload}
            >
              Downloads
            </button>
            {/* <button
            className="btn w-full drop-shadow-lg shadow-md"
            onClick={onClickBookmakrs}
            >
            Bookmarks
          </button> */}
          </ul>
        )}
        <button className="btn btn-neutral w-full mt-6" onClick={handleSignOut}>
          Logout
        </button>
      </section>
    </>
  );
};

export default NavBar;
