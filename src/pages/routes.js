import {
  LuBookmark,
  LuCompass,
  LuHandMetal,
  LuHome,
  LuSmile,
} from "react-icons/lu";

const mainColor = "#129575";

export const Routes = [
  {
    name: "Home",
    path: "/",
    icons: [<LuHome size={24} />, <LuHome color={mainColor} size={24} />],
  },
  {
    name: "Discover",
    path: "/discover",
    icons: [<LuCompass size={24} />, <LuCompass color={mainColor} size={24} />],
  },
  {
    name: "Saved recipes",
    path: "/saved",
    icons: [
      <LuBookmark size={24} />,
      <LuBookmark color={mainColor} size={24} />,
    ],
  },
  {
    name: "About us",
    path: "/about",
    icons: [
      <LuHandMetal size={24} />,
      <LuHandMetal color={mainColor} size={24} />,
    ],
  },
];
