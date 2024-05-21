import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import Book from "../components/Books/Book";
import { materialTypes } from "../types/material";
import Loading from "../components/Shared/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDownloadCloudFill } from "react-icons/ri";
import { CiBookmarkPlus } from "react-icons/ci";

const Books = () => {
  const [materials, setMaterials] = useState<materialTypes[]>([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const bookmark = async (id: string) => {
    if (!user) {
      toast.info("Please login to continue");
      navigate("/auth");
      return;
    }
    const material = materials.find((item) => item.id === id);
    if (!material) {
      toast.warn("Invalid Material");
      return;
    }

    try {
      const collectionRef = collection(database, "bookmarks");

      const ref = collection(database, "bookmarks");
      const queryRef = query(
        ref,
        where("userId", "==", user.uid),
        where("bookId", "==", id)
      );

      const docs = await getDocs(queryRef);

      const bookmarks = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      if (bookmarks.length > 0) {
        //@ts-ignore
        if (bookmarks[0].bookId === id) {
          toast.success("Already added to bookmark");
          return;
        }
      }

      await addDoc(collectionRef, {
        title: material.title,
        bookId: material.id,
        file: material.file,
        photo: material.coverPhoto,
        userId: user?.uid,
      });
      toast.success("Added to bookmarks");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async (id: string) => {
    if (!user) {
      toast.info("Please login to continue");
      navigate("/auth");
      return;
    }

    const material = materials.find((item) => item.id === id);
    if (!material) {
      toast.warn("Invalid Material");
      return;
    }

    const downloadRef = collection(database, "downloads");
    const downloadQueryRef = query(
      downloadRef,
      where("material", "==", id),
      where("user", "==", user?.uid)
    );

    const downloadDocs = getDocs(downloadQueryRef);
    const downloadData = (await downloadDocs).docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (downloadData.length > 0) {
      // @ts-ignore
      if (downloadData[0].material === id) {
        toast.info("Already downloaded to your profile");
        return;
      }
    }

    const docRef = doc(database, "materials", id);
    const collectionRef = collection(database, "downloads");
    await addDoc(collectionRef, {
      user: user.uid,
      material: material.id,
      file: material.file,
      title: material.title,
    });

    await updateDoc(docRef, {
      downloads: material.downloads + 1,
    });
    toast.success("Saved to your downloads");
  };

  const handlePreview = (id: string) => {
    if (!user) {
      toast.info("Please login to continue");
      navigate("/auth");
      return;
    }
    const material = materials.find((item) => item.id === id);
    if (!material) {
      toast.warn("Invalid Materials");
      return;
    }
    const achor = document.createElement("a");
    achor.target = "_blank";
    achor.href = material.file;
    achor.click();
  };

  useEffect(() => {
    const getBooks = async () => {
      const collectionRef = collection(database, "materials");
      const queryRef = query(collectionRef, where("public", "==", true));
      const unSubcribe = onSnapshot(queryRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMaterials(data as materialTypes[]);
      });

      return unSubcribe;
    };

    getBooks();
  }, []);

  if (materials.length === 0) return <Loading />;
  return (
    <section className="container mx-auto px-4 md:px-1">
      <div className="grid grid-cols-1 md:grid-cols-3 my-10 gap-10">
        {materials.map((item) => (
          <Book item={item} key={item.id}>
            <div className="flex justify-center items-center gap-10 flex-col px-3 absolute top-0 bottom-0 right-0 left-0 bg-neutral rounded opacity-0 hover:opacity-100 transition-all duration-500 ease-in-out cursor-pointer">
              <p className="text-white text-center text-md">
                {item.description}
              </p>
              <div className="flex space-x-8">
                {item.downloads > 0 && (
                  <span className="text-white flex justify-center items-center gap-1">
                    <RiDownloadCloudFill color="white" size={30} />{" "}
                    {item.downloads}
                  </span>
                )}

                <button
                  className="text-white flex justify-center items-center gap-1"
                  onClick={() => bookmark(item.id)}
                >
                  <CiBookmarkPlus size={30} />
                </button>
              </div>
              <div className="flex justify-center items-center gap-10">
                <button
                  className="btn btn-outline bg-white text-neutral hover:bg-primary btn-md"
                  onClick={() => handleDownload(item.id)}
                >
                  Download
                </button>
                <button
                  className="btn btn-success btn-md"
                  rel="noreferrer"
                  onClick={() => handlePreview(item.id)}
                >
                  Preview
                </button>
              </div>
            </div>
          </Book>
        ))}
      </div>
    </section>
  );
};

export default Books;
