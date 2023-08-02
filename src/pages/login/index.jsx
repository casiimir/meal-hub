import { useState } from "react";
import Head from "next/head";
import styles from "./login.module.scss";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import {
  LuMenu,
  LuArrowRight,
  LuFacebook,
  LuChrome,
  LuAlertTriangle,
  LuHome,
} from "react-icons/lu";
import { useRouter } from "next/navigation";
import Menu from "@/components/menu";
import Toast from "@/components/Toast";
import signIn from "@/firebase/auth/signin";
import { useAuthContext } from "@/context/AuthContext";

const Login = () => {
  // VARIABLES ----------------
  const router = useRouter();
  const { user } = useAuthContext();
  // CONDITIONS ---------------
  const [pageTitle, setPageTitle] = useState("Hello");
  const [pageSubtitle, setPageSubtitle] = useState(
    "Login to unlock all functionalities!"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);

  const [error, setError] = useState(false);

  // FUNCTIONS ----------------
  const hendleMenuButton = () => {
    // console.log("hendleMenuButton");
    setMenuOpen(!isMenuOpen);
  };
  async function onSubmit(e) {
    e.preventDefault();

    setError(false);
    const { result, error } = await signIn(email, password);

    if (error) {
      setError(true);
      return console.log(error);
    }
    // console.log(result);
    router.push("/profile/" + result.user.uid);
  }

  if (user) {
    router.push("/");
  }
  // RETURN -------------------
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ------------ NAVBAR ------------ */}
      <Navbar
        leftButton={
          <Button
            icon={() => <LuMenu size={24} />}
            type="text"
            color="dark"
            onClick={() => hendleMenuButton()}
          />
        }
        pageTitle={pageTitle}
        rightButton={
          <Button
            icon={() => <LuHome size={24} />}
            type="text"
            color="dark"
            onClick={() => router.push("/")}
          />
        }
      />
      {/* ----------- HEADER ------------- */}
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>{pageTitle}</h1>
          <p>{pageSubtitle}</p>
        </div>
        {/* ------ INIZIO CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}

        <form onSubmit={onSubmit} className={styles.container}>
          <div className={styles.inputContainer}>
            <label htmlFor="email"> Email </label>
            <input
              className={styles.loginForm}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Enter Password</label>
            <input
              className={styles.loginForm}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter Password"
            />
          </div>
          <p>Forgot Password?</p>
          <div className={styles.buttonSubmit}>
            <Button
              icon={() => <LuArrowRight size={24} />}
              size="md"
              text="Login"
              shape="light"
              direction="right"
              submit={true}
            />
          </div>
          <div className={styles.paragraphContainer}>
            <p className={styles.paragraphSignIn}>
              <span>Or</span>
            </p>
          </div>
        </form>

        {/* <div className={styles.socialButton}>
          <Button size="lg" icon={(size) => <LuFacebook size={size} />} />
          <Button
            onClick={() => handleLoginGoogle()}
            size="lg"
            icon={(size) => <LuChrome size={size} />}
          />
        </div> */}
        <p className={styles.dontHaveAccount}>
          Don’t have an account?
          <Button
            size="xs"
            type="text"
            direction="right"
            text="Sign in"
            onClick={() => router.push("/signUp")}
          />
        </p>
        {/* ------ FINE CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
        {/* --------- MODALS & EXTRAS -------- */}
        <Menu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        {/* ----- */}
        {error ? (
          <Toast
            color="warning"
            isOpen={error}
            setIsClosed={() => setError(false)}
            text="OPS! Wrong email or password"
            icon={(size) => <LuAlertTriangle size={size} />}
          />
        ) : null}
      </main>
    </>
  );
};

export default Login;
