import { useContext } from "react";
import { When } from "react-if";
import { AuthContext } from "./context.jsx";

const Auth = (props) => {
  const context = useContext(AuthContext);
  const isLoggedIn = context.isLoggedIn;
  const canDo = props.capability ? context.can(props.capability) : true;
  const okToRender = isLoggedIn && canDo;

  return <When condition={okToRender}>{props.children}</When>;
};

export default Auth;
