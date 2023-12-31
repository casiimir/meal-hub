import { useState } from "react";
import Head from "next/head";
import styles from "./aboutUs.module.scss";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { LuMenu, LuUser, LuArrowLeft } from "react-icons/lu";

const ProfileCard = () => {
  // VARIABLES ----------------
  const router = useRouter();

  // CONDITIONS ---------------
  const [pageTitle, setPageTitle] = useState("About Us");
  const [pageSubtitle, setPageSubtitle] = useState(
    "Together, this diverse team of Michela, Nina, Luna, and Daniel forms a cohesive unit, combining their respective skills in programming, design, and collaboration. Their collective strengths and collaborative mindset ensure that they can tackle complex projects, finding innovative and elegant solutions to deliver outstanding results in the realm of web development and beyond."
  );

  const profiles = [
    {
      src: "https://github.com/casiimir/meal-hub/blob/main/public/assets/img/Michi.jpg?raw=true",
      link: "https://www.linkedin.com/in/michelacerma/",
      title: "Cerma Michela",
      subtitle: "Js - React - Next js - sccs module",
      description:
        "Michela is a highly collaborative team member who always brings an excellent spirit of cooperation to the table. She possesses extensive knowledge and experience in programming with JS, React, and CSS. With her proactive attitude, Michela is always ready to lend a helping hand and find innovative solutions to any challenges the team may encounter.",
    },
    {
      src: "https://github.com/casiimir/meal-hub/blob/e8d5d2faf17ee0e832193b652fbe304f65a2270e/public/assets/img/Nina.jpg?raw=true",
      title: "Inchiappa Nina",
      subtitle: "Js - React - Next js - sccs module - Adobe Suite",
      link:"https://www.linkedin.com/in/maria-antonina-inchiappa/",
      description:
        "Nina is another valuable member of the team, with a unique blend of graphic design skills and expertise in programming with React.jsx and CSS. Her exceptional collaborative abilities make her an asset when working with others, and she excels in problem-solving within the realm of web development.",
    },
    {
      src: "https://github.com/casiimir/meal-hub/blob/dev/public/assets/img/Luna.jpg?raw=true",
      link: "https://www.linkedin.com/in/luna-raimondo/",
      title: "Raimondo Luna",
      subtitle: "Js - React - Next js - sccs module - Adobe Suite - UI/UX",
      description:
        "Luna's strength lies in UI and UX design, bringing a creative and user-centered approach to the team. She has a keen eye for aesthetics and user experience, complemented by her knowledge of programming in JS with the React framework and CSS. Luna's seamless collaboration with her teammates fosters a positive and productive work environment.",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/meal-hub-3d81b.appspot.com/o/users%2FjCU5w3zFknaxU0i7bYAWWyeX0lj1%2Fimg.jpeg?alt=media&token=f1c3a525-057a-4cd2-89fc-dab1be504436",
      title: "Turcanu Daniel",
      subtitle: "Js - React - Next js - sccs module - typescript - MySQL - Firebase",
      link: "https://www.linkedin.com/in/daniel-ntll-10416b150/",
      description:
        "Daniel brings a wealth of knowledge to the team, possessing excellent proficiency in various programming languages such as TypeScript and a deep understanding of frameworks like React and Next.js. Additionally, he is well-versed in database technologies like MySQL and Firebase. Daniel's broad skillset allows him to tackle a wide range of challenges, and his expertise in different areas makes him a valuable resource for the team.",
    },
  ];
  // FUNCTIONS ----------------
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
              onClick={() => {
                if (window.history.state && window.history.state.idx > 0) {
                  router.back();
                } else {
                  router.push("/");
                }
              }}
              icon={() => <LuArrowLeft size={24} />}
              type="text"
              color="dark"
            />
          }
          pageTitle={pageTitle}
          rightButton={null}
        />

        {/* ----------- HEADER ------------- */}
        <main className={styles.main}>
          <div className={styles.title}>
            <h1>{pageTitle}</h1>
            <p>{pageSubtitle}</p>
          </div>

          {/* ------ INIZIO CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}

          <div className={styles.profile__container}>
            {profiles.map((profile, index) => (
              <div className={styles.profile__card} key={index}>
                <a href={profile.link}><img
                  className={styles.profile__image}
                  src={profile.src}
                  alt="Profile"
                /> 
                </a>
                <div className={styles.text__wrap}>
                  <h2 className={styles.profile__title}>{profile.title}</h2>
                  <h6 className={styles.profile__subtitle}>{profile.subtitle}</h6>
                  <p className={styles.profile__description}>
                    {profile.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ------ FINE CONTENUTO PAGINA / ELEMENTI DELLA PAGINA ------ */}
        </main>
      </div>
    </>
  );
};

export default ProfileCard;
