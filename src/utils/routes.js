import {
  LuCompass,
  LuHandMetal,
  LuHome,
  LuMessagesSquare,
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
    path: "/recipe/random",
    icons: [<LuCompass size={24} />, <LuCompass color={mainColor} size={24} />],
  },
  {
    name: "Comunity Comments",
    path: "/comunityComments",
    icons: [
      <LuMessagesSquare size={24} />,
      <LuMessagesSquare color={mainColor} size={24} />,
    ],
  },
  {
    name: "About us",
    path: "/aboutUs",
    icons: [
      <LuHandMetal size={24} />,
      <LuHandMetal color={mainColor} size={24} />,
    ],
  },
];
