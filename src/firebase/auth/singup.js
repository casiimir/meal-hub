import { localStorageManager } from "@/utils/localStorage";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "../config";

const auth = getAuth(app);

export default async function signUp(email, password, name) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password).then(
      async (data) => {
        localStorageManager.setData("user", {
          email,
          name,
          uid: data.user.uid,
        });
        await setDoc(doc(db, "users", data.user.uid), {
          name: name,
          email: email,
          bio: "",
          when: Date.now(),
        }).then(async () => {
          await setDoc(doc(db, "followers", data.user.uid), {
            followers: [],
          })
            .then(async () => {
              await setDoc(doc(db, "following", data.user.uid), {
                following: [],
              });
            })
            .then(async () => {
              await setDoc(doc(db, "saved", data.user.uid), {
                saved: [],
              });
            });
        });
      }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
