import { Link, useLocation } from "react-router-dom";
import "./singlepost.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";

function SinglePost() {
  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname.split("/")[2]);
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});

  const PF = "http://localhost:9000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      // console.log(res)
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  // console.log(path)

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title: title,
        desc,
      });
      // window.location.reload();
      setUpdateMode(false)
    } catch (err) {}
  };
  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlepostimg" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singleposttitleinput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singleposttitle">
            {title}
            {post.username === user?.username && (
              <div className="singlepostedit">
                <i
                  className="singleposticon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singleposticon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlepostinfo">
          <span className="singlepostauthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlepostauthor">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {updateMode ? (
          <textarea
            className="singlepostdescinput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlepostdesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlepostbutton" onClick={handleUpdate}>
          Update
        </button>
        ) }
        
      </div>
    </div>
  );
}

export default SinglePost;
