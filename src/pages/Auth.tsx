import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function Auth() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const handleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      toast.success(`Welome ${response.user.displayName}`);
      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [loading]); // eslint-disable-line
  return (
    <section className="bg-gray-900 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="auth-bg flex-1 hidden md:block">
          <p className="relative z-10">
            Discover the power of active learning! Engage with your study
            materials by summarizing key points in your own words, teaching
            concepts to a friend, or creating flashcards. Active learning not
            only deepens your understanding but also makes studying more
            enjoyable and effective
          </p>
          <h2 className="relative z-10 mt-6 font-semibold">
            Empower Your Learning Journey with UniShare - Your Gateway to
            Academic Excellence!
          </h2>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-center text-md my-9 md:hidden text-gray-400">
            Empower Your Learning Journey with UniShare - Your Gateway to
            Academic Excellence!
          </h2>
          <button className="btn btn-outline text-white" onClick={handleAuth}>
            <FcGoogle size={30} />
            <span>Continue With Your Student Email</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Auth;
