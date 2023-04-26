import Header from "../../header/Header"
import {useEffect, useState} from "react";
import Posts from '../../posts/Posts'
import Sidebar from '../../sidebar/Sidebar'
import './home.css';
import axios from "axios";
import { useLocation } from "react-router-dom";

function Home() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();
  // console.log(location)

  useEffect(()=>{
const fetchPosts = async ()=>{
 const res = await axios.get("/posts"+search);
//  console.log(res);
setPosts(res.data);
}
fetchPosts()
  },[search])
  return (
    <>
    <Header/>
    <div className='home'>
      <Posts posts={posts}/>
      <Sidebar/>
    
    </div>
    </>
  )
}

export default Home
