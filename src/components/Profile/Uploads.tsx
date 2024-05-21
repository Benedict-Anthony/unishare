import React, { ChangeEvent, useEffect, useState } from "react";
import ProfileContainer from "./ProfileContainer";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { departments } from "../../data/department";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, database, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { materialTypes } from "../../types/material";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import Loading from "../Shared/Loading";

type MaterialProps = {
  coverPhoto: string;
  title: string;
  description: string;
  file: string;
  department: string;
  public: boolean;
};

const schema = yup.object({
  title: yup.string().required("Please provide a title"),
  coverPhoto: yup.string().required("Please provide a cover photo"),
  description: yup
    .string()
    .required("Please provide a description")
    .min(10, "description is not sufficient"),
  file: yup.string().required("Please provide a file"),
  department: yup.string().required("please select a department"),
  public: yup.boolean().default(true),
});

const Uploads = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<MaterialProps>({
    resolver: yupResolver(schema),
  });
  const [user] = useAuthState(auth);
  const [file, setFile] = useState<File>();
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const [userData, setUserData] = useState<materialTypes[]>([]);

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files as unknown as File);
    setValue("file", "uploaded");
  };

  const onChangeCoverPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    setCoverPhoto(e.target.files as unknown as File);

    setValue("coverPhoto", "coverPhoto");
  };

  const onSubmit = async (data: MaterialProps) => {
    // @ts-ignore
    const material = file[0];
    // @ts-ignore
    const photo = coverPhoto[0];
    if (!material) {
      setError("file", { message: "Please provide a PDF file" });

      return;
    }

    if (!material.type.endsWith("pdf")) {
      setError("file", { message: "Please provide a PDF file" });
      return;
    }

    if (!photo) {
      setError("coverPhoto", {
        message: "Please provide a cover photo",
      });
      return;
    }
    if (photo.type.endsWith("pdf")) {
      setError("coverPhoto", {
        message: "cover photo should be png or jpeg",
      });
      return;
    }
    try {
      // store files
      const fileStorageRef = ref(storage, `materials/${uuidv4()}`);
      await uploadBytes(fileStorageRef, material);
      const url = await getDownloadURL(fileStorageRef);
      setValue("file", url);

      // store photos
      const photoStorageRef = ref(storage, `coverPhoto/${uuidv4()}`);
      await uploadBytes(photoStorageRef, photo);
      const photoURL = await getDownloadURL(photoStorageRef);
      setValue("coverPhoto", photoURL);

      const collectionRef = collection(database, "materials");
      const materialData = {
        ...data,
        userID: user?.uid,
        postedBy: user?.displayName,
        downloads: 0,
        timeStamp: serverTimestamp(),
      };
      await addDoc(collectionRef, materialData);
      reset();
      document.getElementById("close-modal")?.click();
      toast.success("uploaded succesfully");
    } catch (error) {
      throw new Error("Somthing went wrong...");
    }
  };

  const handleEdit = async (id: string) => {
    const material = userData.find((item) => item.id === id);

    if (!material) {
      toast.error("Error!");
      return;
    }

    setValue("title", material.title);
    setValue("description", material.description);
    // setValue("department", material.)
    setValue("coverPhoto", material.coverPhoto);
    setValue("file", material.file);
    setValue("file", material.file);
    // setValue("public", material)

    document.getElementById("my_modal")?.click();
  };
  const handleDelete = async (id: string) => {
    const material = userData.find((item) => item.id === id);
    if (!material) {
      toast.error("Error!");
      return;
    }
    if (window.confirm(`Are your you want to delete ${material.title}`)) {
      const ref = doc(database, "materials", material.id);
      await deleteDoc(ref);
      toast.info(`${material.title} DELETED!!!`);
    }
  };
  const handleView = async (id: string) => {
    const material = userData.find((item) => item.id === id);
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
    const getUserUploads = async () => {
      const collectionRef = collection(database, "materials");
      const queryRef = query(collectionRef, where("userID", "==", user?.uid));
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
      <div className="flex flex-col justify-end items-end">
        {/* The button to open modal */}
        <label
          htmlFor="my_modal_6"
          id="my_modal"
          className="btn btn-outline text-primary absolute md:relative z-5 top-0 mt-2 overflow-hidden "
        >
          Upload Material
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal px-3 overflow-hidden" role="dialog">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a new material!</h3>
            <div className="modal-action absolute top-0 right-1">
              <label
                htmlFor="my_modal_6"
                className="btn btn-outline btn-sm"
                id="close-modal"
              >
                <FaTimes size={15} className="text-warning" />
              </label>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 overflow-hidden"
            >
              <div className="form-control w-full">
                <label htmlFor="title" className="label label-text">
                  Title
                </label>
                {errors.title && (
                  <span className="text-error">{errors.title.message}</span>
                )}
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label htmlFor="description" className="label label-text">
                  Description
                </label>
                {errors.description && (
                  <span className="text-error">
                    {errors.description.message}
                  </span>
                )}
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered h-[5rem] resize-none w-full"
                  placeholder="Bio"
                ></textarea>
              </div>

              <label className="form-control w-full">
                <label htmlFor="title" className="label label-text">
                  Department
                </label>

                <div className="label">
                  <span className="label-text">
                    Pick the best fantasy franchise
                  </span>
                  {errors.description && (
                    <span className="text-error">
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <select
                  className="select select-bordered"
                  {...register("department")}
                >
                  {departments.map((opt, index) => (
                    <option value={opt} key={index + 1}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>

              <div className="form-control w-full">
                <label htmlFor="file" className="label label-text">
                  Cover Photo
                </label>
                {errors.coverPhoto && (
                  <span className="text-error">
                    {errors.coverPhoto?.message}
                  </span>
                )}
                <input
                  onChange={onChangeCoverPhoto}
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>

              <div className="form-control w-full">
                <label htmlFor="file" className="label label-text">
                  PDF file
                </label>
                {errors.file && (
                  <span className="text-error">{errors.file.message}</span>
                )}
                <input
                  onChange={onChangeFile}
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Make it public available</span>
                  <input
                    {...register("public")}
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>

              <div className=" form-control">
                {isSubmitting ? (
                  <div className=" btn btn-outline hover:bg-white hover:text-neutral cursor-wait">
                    <span className="text-lg opacity-75">uploading</span>
                    <span className="loading loading-dots loading-md opacity-75"></span>
                  </div>
                ) : (
                  <button
                    className="btn block btn-neutral w-full mt-4 mb-7"
                    type="submit"
                  >
                    Upload
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {userData.length === 0 ? (
          <Loading />
        ) : (
          userData.map((data) => (
            <div
              className="shadow py-1 px-3 mb-3 rounded-sm flex justify-between items-center"
              key={data.id}
            >
              <div className="">
                <h4 className="font-bold mb-3 md:text-xl capitalize">
                  {data.title}
                </h4>
                <div className="flex justify-start items-start gap-3">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleEdit(data.id)}
                  >
                    <CiEdit className="text-success" />
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleView(data.id)}
                  >
                    <FaRegEye className="text-info" />
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleDelete(data.id)}
                  >
                    <LuTrash2 className="text-warning" />
                  </button>
                </div>
              </div>
              <div className="w-20 h-20 shadow-md border-3 border-primary">
                <img
                  src={data.coverPhoto}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))
        )}
      </section>
    </ProfileContainer>
  );
};

export default Uploads;
