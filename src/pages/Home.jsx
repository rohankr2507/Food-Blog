import React from "react";
import { useState, useEffect } from "react";
import { client, database } from "../appwrite/appwrite";
import conf from "../conf/conf";
import AllPosts from "../components/AllPosts";
import ReactLoading from "react-loading";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await database.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId
        );

        // console.log(response.documents);
        setPosts(response.documents);
      } catch (error) {
        console.log("Appwrite all posts fetch error :", error);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length == 0) {
    return (
      <div className="container flex justify-center items-center bg-gradient-to-br from-cyan-50 to-pink-50 px-16 py-80 lg:px-24 lg:py-80">
        <ReactLoading type="spin" color="#ce93d8" />
      </div>
    );
  }

  return (
    <>
      <div className="container px-6 py-12 pb-1 lg:px-16 lg:py-24 lg:pb-12 bg-gradient-to-br from-cyan-50 to-pink-50">
        <AllPosts posts={posts} />
      </div>
    </>
  );
};

export default Home;
