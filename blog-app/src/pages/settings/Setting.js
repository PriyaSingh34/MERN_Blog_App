import "./settings.css";
import Sidebar from "../../sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

function Setting() {
  const { user ,dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
const PF = "http://localhost:9000/images/"
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"})
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingstitle">
          <span className="settingsupdatetitle">Update Your Account</span>
          <span className="settingsdeletetitle">Delete Your Account</span>
        </div>
        <form className="settingsform" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingspp">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileinput">
              <i className="settingsppicon fa-solid fa-user"></i>
            </label>
            <input
              type="file"
              id="fileinput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingssubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile Updated Successfully
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

export default Setting;
