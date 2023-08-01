import { localStorageManager } from "@/utils/localStorage";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { app, db } from "../config";

const auth = getAuth(app);

export default async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        result = res;
        const docRef = doc(db, "users", res.user.uid);
        const docSnap = await getDoc(docRef);

        let userData;

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          userData = docSnap.data();
          localStorageManager.setData("user", {
            email,
            name: userData.name,
            uid: res.user.uid,
          });
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          error = true;
        }
      }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
