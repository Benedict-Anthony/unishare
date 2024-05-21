import React, { useEffect, useState } from "react";
import NavBar from "../components/Profile/NavBar";
import Uploads from "../components/Profile/Uploads";
import Downloads from "../components/Profile/Downloads";
import BookMarks from "../components/Profile/BookMarks";
type componentType = "uploads" | "downloads" | "bookmarks";

const Profile = () => {
  const [component, setComponent] = useState<componentType>("uploads");

  useEffect(() => {
    document.getElementById("profile_navbar")?.classList.remove("open");
  }, [component]);
  return (
    <section className="relative">
      <NavBar
        onClickUploads={() => setComponent("uploads")}
        onClickBookmakrs={() => setComponent("bookmarks")}
        onClickDownload={() => setComponent("downloads")}
      />

      <div className="md:pl-96">
        {component === "uploads" ? (
          <Uploads />
        ) : component === "downloads" ? (
          <Downloads />
        ) : component === "bookmarks" ? (
          <BookMarks />
        ) : null}
      </div>
    </section>
  );
};

export default Profile;
