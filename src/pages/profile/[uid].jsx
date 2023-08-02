import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./Profile.module.scss";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import {
  LuArrowLeft,
  LuBookmark,
  LuPencil,
  LuPlay,
  LuUserMinus,
  LuUserPlus,
} from "react-icons/lu";
import { useRouter } from "next/router";
import CardHero from "@/components/CardHero";
import Menu from "@/components/menu";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import ModifyUser from "@/components/ModifyUser";
import { localStorageManager } from "@/utils/localStorage";
import { useAuthContext } from "@/context/AuthContext";

const Profile = ({ user, uid, followers, following }) => {
  // VARIABLES ----------------
  const router = useRouter();
  const { saved } = useAuthContext();
  // CONDITIONS ---------------
  const [pageTitle, setPageTitle] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [content, setContent] = useState("saved"); // "saved" |  "watched";
  const [data, setData] = useState(user?.saved);
  const [isModifyOpen, setModifyOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const [followersLength, setFollowersLength] = useState(followers?.length);
  const [followingLength, setFollowingLength] = useState(following?.length);

  const [localData, setLocalData] = useState(null);
  const [follow, setFollow] = useState(false);

  // FUNCTIONS ----------------
  const handleSwitchContent = (content) => {
    setContent(content);
    content === "saved" ? getSavedData() : null;
  };

  const getSavedData = async () => {
    const aux = [];
    const docRef = doc(db, "saved", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:");
      const recipeRef = collection(db, "recipes");
      for (let index = 0; index < docSnap.data()?.saved?.length; index++) {
        console.log(docSnap.data()?.saved[index]);
        const q = query(
          recipeRef,
          where("idMeal", "==", docSnap.data()?.saved[index])
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          aux.push(doc.data());
        });
      }
      const promise = Promise.all(aux);

      setData(aux);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handleFollowUnfollow = async () => {
    console.log("handleFollowUnfollow");
    setFollow(!follow);
    if (follow) {
      //DO UNFOLLOW
      const obj = {
        uid: uid,
        currentUid: localData?.uid,
      };
      await fetch("https://meal-hub-tau.vercel.app/api/unfollow", {
        method: "POST",
        body: JSON.stringify(obj),
      }).then(async (res) => {
        const data = await res.json();
        console.log("handleFollowUnfollow - unfollow - res:", data);
      });
      setFollowersLength(followersLength - 1);
    } else {
      //DO FOLLOW
      const obj = {
        uid: uid,
        currentUid: localData?.uid,
      };
      await fetch("https://meal-hub-tau.vercel.app//api/follow", {
        method: "POST",
        body: JSON.stringify(obj),
      }).then(async (res) => {
        const data = await res.json();
        console.log("handleFollowUnfollow - follow - res:", data);
      });
      setFollowersLength(followersLength + 1);
    }
  };

  useEffect(() => {
    if (user) {
      setUserData(user);
      setPageTitle(user.name);
      setLocalData(localStorageManager.getData("user"));
      if (followers.length > 0) {
        setFollow(followers.includes(localStorageManager.getData("user").uid));
      }
    }
  }, [user]);

  useEffect(() => {
    getSavedData();
  }, []);

  const handleRemoveSpecificIndex = (index) => {
    setData((data) => data.filter((_, i) => i !== index));
  };

  // RETURN -------------------
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.Profile}>
        <main>
          {/* ------------ NAVBAR ------------ */}
          <Navbar
            leftButton={
              <Button
                icon={() => <LuArrowLeft size={24} />}
                type="text"
                color="dark"
                onClick={() => {
                  router.back();
                }}
              />
            }
            pageTitle={pageTitle}
            rightButton={
              localData?.uid === uid ? (
                <Button
                  text="Modify"
                  direction="right"
                  size="xs"
                  type="text"
                  color="primary"
                  icon={() => <LuPencil size={24} />}
                  onClick={() => setModifyOpen(true)}
                />
              ) : null
            }
          />
          {/* ----------- HEADER ------------- */}
          <div className="page-header">
            <div className={styles.profile__info}>
              <div className={styles.profile__info__header}>
                <div className={styles.avatar}>
                  <img
                    className={styles.avatar__img}
                    src={
                      userData?.imgUrl ||
                      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                    }
                    alt="User image profile"
                  />
                </div>
                <div className={styles.profile__data}>
                  <h2 className={styles.username}>{userData?.name}</h2>

                  <div className={styles.profile_user}>
                    <div className={styles.profile__data__container}>
                      <b>Followers</b>
                      <p>{followersLength}</p>
                    </div>
                    <div className={styles.profile__data__container}>
                      <b>Following</b>
                      <p>{followingLength}</p>
                    </div>
                  </div>
                </div>
              </div>
              {localData?.uid !== uid ? (
                <div>
                  <Button
                    width="full"
                    size="sm"
                    color={follow ? "tertiary" : "primary"}
                    text={follow ? "Unfollow" : "Follow"}
                    direction="right"
                    icon={
                      follow
                        ? (size) => <LuUserMinus size={size} />
                        : (size) => <LuUserPlus size={size} />
                    }
                    onClick={() => {
                      handleFollowUnfollow();
                    }}
                  />
                </div>
              ) : null}

              <div className={styles.description}>
                <p>{userData?.bio}</p>
              </div>
            </div>
          </div>

          {/* ------ INIZIO CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
          <div className={styles.content}>
            <div className={styles.header}>
              <Button
                text="Saved"
                size="xs"
                type={content === "saved" ? "fill" : "outline"}
                onClick={() => handleSwitchContent("saved")}
                direction={"right"}
                icon={() => <LuBookmark size={18} />}
              />
              {/* <Button
                text="Watched"
                size="xs"
                type={content === "watched" ? "fill" : "outline"}
                onClick={() => handleSwitchContent("watched")}
                direction={"right"}
                icon={() => <LuPlay size={18} />}
              /> */}
            </div>

            <div className={styles.content__content}>
              {data?.map((recep, index) => {
                return (
                  <CardHero
                    callback={() => handleRemoveSpecificIndex(index)}
                    data={recep}
                    key={index + "Profile Page"}
                  />
                );
              })}
            </div>
          </div>
          {/* ------ FINE CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
        </main>
        {/* --------- MODALS & EXTRAS -------- */}
        <Menu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        <ModifyUser
          userData={userData}
          isModifyOpen={isModifyOpen}
          setModifyOpen={setModifyOpen}
        />
      </div>
    </>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  let error = false;
  let userData;
  let followers = [];
  let following = [];

  const uid = context.query.uid;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  const docRefFollowing = doc(db, "following", uid);
  const docSnapFollowing = await getDoc(docRefFollowing);

  const docRefFollowers = doc(db, "followers", uid);
  const docSnapFollowers = await getDoc(docRefFollowers);

  // USER ---------
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    userData = docSnap.data();
  } else {
    console.log("No such document!");
    error = true;
  }
  // FOLLOWING ---------
  if (docSnapFollowing.exists()) {
    console.log("Document data:", docSnapFollowing.data().following);
    following = docSnapFollowing.data().following;
  } else {
    console.log("No such document!");
    error = true;
  }
  // FOLLOWERS ---------
  if (docSnapFollowers.exists()) {
    console.log("Document data:", docSnapFollowers.data().followers);
    followers = docSnapFollowers.data().followers;
  } else {
    console.log("No such document!");
    error = true;
  }

  return {
    props: {
      user: userData,
      uid: uid,
      followers: followers,
      following: following,
      notFound: error,
    },
  };
}
