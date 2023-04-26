import { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  // console.log(user)
  return (
    <div className="login">
      <span className="logintitle">Login</span>
      <form className="loginform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="logininput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="logininput"
          type="password"
          placeholder="Enter your Password..."
          ref={passwordRef}
        />
        <button className="loginbutton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginregisterbutton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}

export default Login;
