import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export async function UploadSingleImageFirebase(immagine, nome, folder) {
  // console.log("Immagini : ", immagine);
  let path = "/" + folder + "/" + nome;

  let imageRef = ref(storage, path);
  console.log("Immagine : ", immagine);
  await uploadBytes(imageRef, immagine).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
  let url = await getDownloadURL(imageRef);
  return url;
}
