import styles from "./Menu.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { LuAlertTriangle, LuPencil, LuUploadCloud, LuX } from "react-icons/lu";
import Button from "../Button";
import { useAuthContext } from "@/context/AuthContext";
import Toast from "../Toast";
import { UploadSingleImageFirebase } from "@/firebase/imageUpload";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { localStorageManager } from "@/utils/localStorage";

const ModifyUser = ({ isModifyOpen, setModifyOpen, userData }) => {
  // VARIABLES ----------------
  const router = useRouter();
  const { user } = useAuthContext();

  const inputImgRef = useRef(null);

  // CONDITIONS ---------------
  const [images, setImages] = useState([]);
  const [compressedImg, setCompressedImg] = useState();

  const [classMenu, setClassMenu] = useState("isClosed"); //"isOpen" | "isClosed"
  const [newImg, setNewImg] = useState(null);
  const [newName, setNewName] = useState(null);
  const [newBio, setNewBio] = useState(null);

  const [localUser, setLocalUser] = useState(null);

  const [noChanges, setNoChanges] = useState(false);
  // FUNCTIONS ----------------
  useEffect(() => {
    if (images.length < 1) {
      setLocalUser(localStorageManager.getData("user"));
      return;
    } else {
      const newImageUrls = [];
      images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
      setNewImg(newImageUrls);
    }
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
    compressImage(e);
  }
  const compressImage = async (e) => {
    const imageFile = e.target.files[0];

    setCompressedImg(imageFile);
  };

  useEffect(() => {
    if (isModifyOpen) {
      setClassMenu("isOpen");
    } else {
      setClassMenu("isClosed");
    }
  }, [isModifyOpen]);

  const handleUploadData = async () => {
    console.log("handleSaveData");
    if (compressedImg) {
      const folder = "users/" + user?.uid;
      const name = Date.now();
      await UploadSingleImageFirebase(compressedImg, name, folder).then(
        async (resp) => {
          const userRef = doc(db, "users", user?.uid);
          setDoc(
            userRef,
            {
              name: newName ? newName : userData.name,
              bio: newBio ? newBio : userData.bio,
              imgUrl: resp,
            },
            { merge: true }
          ).then(() => {
            let auxUser = localUser;
            auxUser.name = newName ? newName : userData.name;
            localStorageManager.setData("user", auxUser);
            router.reload();
          });
        }
      );
    } else {
      const userRef = doc(db, "users", user?.uid);
      setDoc(
        userRef,
        {
          name: newName ? newName : userData.name,
          bio: newBio ? newBio : userData.bio,
        },
        { merge: true }
      ).then(() => {
        let auxUser = localUser;
        auxUser.name = newName ? newName : userData.name;
        localStorageManager.setData("user", auxUser);
        router.reload();
      });
    }
  };

  const handleSetName = (string) => {
    console.log(string);
    setNewName(string);
  };
  const handleSetBio = (string) => {
    console.log(string);
    setNewBio(string);
  };

  // RETURN -------------------
  return (
    <div
      className={`
    ${styles.SlideMenu}
    ${styles[classMenu]}
    `}
    >
      <div className={`${styles.header}`}>
        <Button
          type="outline"
          color="dark"
          icon={(size) => <LuX size={size} />}
          onClick={() => setModifyOpen(false)}
        />
        <Button
          type="fill"
          color={newImg || newName || newBio ? "primary" : "warning"}
          text="Save"
          direction="right"
          icon={(size) => <LuUploadCloud size={size} />}
          onClick={
            newImg || newName || newBio
              ? () => handleUploadData()
              : () => setNoChanges(true)
          }
        />
      </div>

      <div className={`${styles.content}`}>
        <h2>Edit profile data</h2>

        <div className={styles.section}>
          <div className={styles.section__header}>
            <h4>User image</h4>
            <Button
              size="xs"
              type="fill"
              text="Modify"
              direction="right"
              color="secondary"
              icon={(size) => <LuPencil size={size} />}
              onClick={
                inputImgRef ? () => inputImgRef.current.click() : () => {}
              }
            />
          </div>
          <div className={styles.row}>
            <input
              ref={inputImgRef}
              style={{ display: "none" }}
              type="file"
              accept="application/octet-stream, image/*"
              onChange={onImageChange}
            />
            <div className={styles.avatar}>
              <img
                className={styles.avatar__img}
                src={newImg ? newImg : user?.imgUrl}
                alt="User image not aviable"
              />
            </div>
          </div>
        </div>
        {/* ------- */}
        <div className={styles.section}>
          <div className={styles.section__header}>
            <h4>User name</h4>
            <Button
              size="xs"
              type="fill"
              text="Modify"
              direction="right"
              color="secondary"
              icon={(size) => <LuPencil size={size} />}
              onClick={() => {
                setNewName("");
              }}
            />
          </div>
          <div className={styles.row}>
            <input
              onChange={(e) => {
                handleSetName(e.target.value);
              }}
              disabled={newName === null ? true : false}
              placeholder={userData?.name}
              className={styles.input}
              type={"text"}
            />
          </div>
        </div>
        {/*-------------  */}
        <div className={styles.section}>
          <div className={styles.section__header}>
            <h4>Bio</h4>
            <Button
              size="xs"
              type="fill"
              text="Modify"
              direction="right"
              color="secondary"
              icon={(size) => <LuPencil size={size} />}
              onClick={() => {
                setNewBio("");
              }}
            />
          </div>
          <div className={styles.row}>
            <textarea
              onChange={(e) => {
                handleSetBio(e.target.value);
              }}
              disabled={newBio === null ? true : false}
              placeholder={userData?.bio ? userData?.bio : "No bio"}
              className={styles.textarea}
              type={"text"}
            />
          </div>
        </div>
        {/*-------------  */}
      </div>
      {/* ----- */}
      {noChanges ? (
        <Toast
          color="warning"
          isOpen={noChanges}
          setIsClosed={() => {
            setNoChanges(false);
          }}
          text="No changes were detected... :("
          icon={(size) => <LuAlertTriangle size={size} />}
        />
      ) : null}
    </div>
  );
};

export default ModifyUser;
