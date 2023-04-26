import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Setting from "./pages/settings/Setting";
import Single from "./pages/single/Single";
import Topbar from "./topbar/Topbar";
import Write from "./write/Write";
import Register from "./pages/register/Register"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./post/Post";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const {user} = useContext(Context)
  return (
    <>
      <Topbar />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={user ? <Home/> :<Register/>} />
      <Route path="/login" element={user ? <Home/> : <Login/>} />
      <Route path="/write" element={user ? <Write/> : <Register/>} />
      <Route path="/settings" element={user ? <Setting/> : <Register/>} />
      <Route path="/post/:postId" element={<Single/>} />
        
      </Routes>
      
      </>
  );
}

export default App;
