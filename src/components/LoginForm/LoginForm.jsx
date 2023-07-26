import Link from 'next/link';
import styles from './LoginForm.module.scss'

const LoginForm = () => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleDoLogin = (e) => {
    e.preventDefault();
  }
  // RETURN -------------------
  return (
    <form onSubmit={(e) => handleDoLogin(e)} className={styles.LoginForm}>
      <div className={styles.label}>
        <p className={styles.labelTitle}>
          Email
        </p>
        <input className={styles.input_email} type='email' placeholder='Enter Email' />
      </div>
      <div className={styles.label}>
        <p className={styles.labelTitle}>
          Enter Password
        </p>
        <input className={styles.input_password} type='password' placeholder='Enter Password' />
      </div>

      <div className={styles.forgotPassword}>
        <Link className={styles.link} href={"/forgotPassword"} >
          Forgot Password?
        </Link>
      </div>

      <div className={styles.buttonLogin}>
        Sign In
      </div>

    </form>
  );
}

export default LoginForm;