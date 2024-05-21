import React, { useEffect, useState } from "react";
import ProfileContainer from "./ProfileContainer";
import { materialTypes } from "../../types/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loading from "../Shared/Loading";

const Downloads = () => {
  const [userData, setUserData] = useState<materialTypes[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUserUploads = async () => {
      const collectionRef = collection(database, "downloads");
      const queryRef = query(collectionRef, where("user", "==", user?.uid));
      const unSubscribe = onSnapshot(queryRef, (docs) => {
        const data = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserData(data as materialTypes[]);
      });
      return unSubscribe;
    };

    getUserUploads();
  }, []); // eslint-disable-line
  return (
    <ProfileContainer>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {userData.length === 0 ? (
          <Loading />
        ) : (
          userData.map((data) => (
            <div
              className="shadow py-1 px-3 mb-3 rounded-sm flex justify-between items-center"
              key={data.id}
            >
              <div className="flex items-center justify-start gap-4">
                <h4 className="font-bold mb-3 md:text-xl capitalize">
                  {data.title}
                </h4>
                <div className="">
                  <a
                    href={data.file}
                    target="_blank"
                    className="btn btn-neutral"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </ProfileContainer>
  );
};

export default Downloads;
