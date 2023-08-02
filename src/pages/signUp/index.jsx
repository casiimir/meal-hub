import { useState } from "react";
import Head from "next/head";
import styles from "./SignUp.module.scss";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import {
  LuMenu,
  LuUser,
  LuArrowRight,
  LuFacebook,
  LuChrome,
  LuEyeOff,
  LuEye,
  LuAlertTriangle,
  LuSkull,
  LuStars,
  LuSprout,
  LuHome,
} from "react-icons/lu";
import { useRouter } from "next/router";
import Toast from "@/components/Toast";
import signUp from "@/firebase/auth/singup";
import Badge from "@/components/Badge";
import Menu from "@/components/menu";
import { useAuthContext } from "@/context/AuthContext";

const SingUp = () => {
  // VARIABLES ----------------
  const router = useRouter();
  const { user } = useAuthContext();
  // CONDITIONS ---------------
  const [pageTitle, setPageTitle] = useState("Create an account");
  const [pageSubtitle, setPageSubtitle] = useState(
    "Let’s help you set up your account, it won’t take long."
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [label] = useState("Accept terms and Condition");
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [info, setInfo] = useState("");

  const [submitting, setSubmitting] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);

  // FUNCTIONS ----------------
  const hendleMenuButton = () => {
    console.log("hendleMenuButton");
    setMenuOpen(!isMenuOpen);
  };
  async function onSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    } else {
      setSubmitting("It will take some seconds...");
      const { result, error } = await signUp(email, password, name);
      setSubmitting("");
      if (error) {
        setRegisterError(true);
        return console.log(error);
      }
      console.log(result);
      router.push("/");
    }
  }
  const toggleShowPassword = () => {
    setIsShow(!isShow);
  };

  const toggleShowPasswordConfirm = () => {
    setIsShowConfirm(!isShowConfirm);
  };

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
      <div className={styles.HomePage}>
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
              <label htmlFor="name">Name</label>
              <input
                className={styles.loginForm}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="email">Email</label>
              <input
                className={styles.loginForm}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email"
              />
            </div>
            <div className={`${styles.PasswordWrap} ${styles.inputContainer}`}>
              <label className={styles.passwordHeader} htmlFor="password">
                <span>Password</span>
                <Badge
                  size="sm"
                  type="outline"
                  color={password.length < 6 ? "warning" : "primary"}
                  text={password.length + " / 6"}
                  shape="light"
                  onClick={() =>
                    setInfo(
                      "Passwords must have at least 6 chars. Don't write on a post it! xD"
                    )
                  }
                />
              </label>
              <input
                className={styles.loginForm}
                type={isShow ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
              />
              <div
                className={styles.iconContainer}
                onClick={() => toggleShowPassword()}
              >
                <div className={styles.iconEye}>
                  {isShow ? (
                    <LuEye color="#129575" size={25} />
                  ) : (
                    <LuEyeOff color="#92949c" size={25} />
                  )}
                </div>
              </div>
            </div>
            <div className={`${styles.PasswordWrap} ${styles.inputContainer}`}>
              <label
                className={styles.passwordHeader}
                htmlFor="ConfirmPassword"
              >
                <spam>Confirm Password</spam>
                <Badge
                  size="sm"
                  type="outline"
                  color={password !== confirmPassword ? "warning" : "primary"}
                  text={password !== confirmPassword ? "x(" : ":)"}
                  shape="light"
                  onClick={() =>
                    setInfo(
                      "Passwords must match. If not which of the two should you use to log in? xD"
                    )
                  }
                />
              </label>
              <input
                className={styles.loginForm}
                type={isShowConfirm ? "text" : "password"}
                name="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
              />
              <div
                className={styles.iconContainer}
                onClick={() => toggleShowPasswordConfirm()}
              >
                <div className={styles.iconEye}>
                  {isShowConfirm ? (
                    <LuEye color="#129575" size={25} />
                  ) : (
                    <LuEyeOff color="#92949c" size={25} />
                  )}
                </div>
              </div>
            </div>
            <div className={styles.checkboxWrapper}>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked()}
                />
                <span>{label}</span>
              </label>
            </div>
            <div className={styles.buttonSubmit}>
              <Button
                icon={() => <LuArrowRight size={24} />}
                size="sm"
                text="Sign in"
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
            <Button size="lg" icon={(size) => <LuChrome size={size} />} />
          </div> */}
          <p className={styles.dontHaveAccount}>
            Already a member
            <Button
              size="xs"
              type="text"
              direction="right"
              text="Login"
              onClick={() => router.push("/login")}
            />
          </p>
          {/* ------ FINE CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
          {/* --------- MODALS & EXTRAS -------- */}
          <Menu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
          {/* ----- */}
          {passwordError ? (
            <Toast
              color="warning"
              isOpen={passwordError}
              setIsClosed={() => setPasswordError(false)}
              text="Passwords do not match!"
              icon={(size) => <LuAlertTriangle size={size} />}
            />
          ) : null}
          {/* ----- */}
          {registerError ? (
            <Toast
              color="danger"
              isOpen={registerError}
              setIsClosed={() => setRegisterError(false)}
              text="OPS! Something went wrong! Email not valid or try later. "
              icon={(size) => <LuSkull size={size} />}
            />
          ) : null}
          {/* ----- */}
          {info.length > 0 ? (
            <Toast
              color="secondary"
              isOpen={info.length > 0}
              setIsClosed={() => setInfo("")}
              text={info}
              icon={(size) => <LuStars size={size} />}
            />
          ) : null}
          {/* ----- */}
          {submitting.length > 0 ? (
            <Toast
              color="primary"
              isOpen={submitting.length > 0}
              setIsClosed={() => setSubmitting("")}
              text={submitting}
              timer={15}
              icon={(size) => <LuSprout size={size} />}
            />
          ) : null}
        </main>
      </div>
    </>
  );
};

export default SingUp;
