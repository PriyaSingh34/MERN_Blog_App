import { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      // console.log(res)
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebaritem">
        <span className="sidebartitle">ABOUT US</span>
        <img
          src="https://img1.etsystatic.com/121/0/11722399/il_fullxfull.1023499561_7hxf.jpg"
          alt=""
        />
        <p>
          This website covers the hot topics in the town, and along with that it
          consists of various types of blogs.You all can register to this
          website and start uploading your own blogs.You can add food blogs and
          recepies,your photography blogs ,tourist places etc etc...
        </p>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">CATEGORIES</span>
        <ul className="sidebarlist">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarlistitem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <span className="sidebartitle">FOLLOW US</span>
      <div className="sidebarsocial">
        <i className="  sidebaricon fa-brands fa-facebook"></i>
        <i className="sidebaricon fa-brands fa-square-twitter"></i>
        <i className="sidebaricon fa-brands fa-square-pinterest"></i>
        <i className="sidebaricon fa-brands fa-square-instagram"></i>
      </div>
    </div>
  );
}

export default Sidebar;
