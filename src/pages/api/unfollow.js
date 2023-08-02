import { db } from "@/firebase/config";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

export default async function handler(req, res) {
  console.log("UNFOLLOW");
  const dataReq = req.body;
  const data = JSON.parse(dataReq);
  // console.log(data);
  const followingRef = doc(db, "following", data.currentUid);
  await updateDoc(followingRef, {
    secret: data.currentUid,
    following: arrayRemove(data.uid),
  })
    .catch((err) => console.log("ERR : ", err))
    .then((res) => {
      console.log(res);
    });
  //-------
  const followerRef = doc(db, "followers", data.uid);
  await updateDoc(followerRef, {
    secret: data.uid,
    followers: arrayRemove(data.currentUid),
  })
    .catch((err) => console.log("ERR : ", err))
    .then((res) => {});
  res.status(200).json({ res: "Unfollowed with success this uid " + data.uid });
}
