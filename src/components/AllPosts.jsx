import React from "react";
import PostCard from "../components/PostCard";

function AllPosts({ posts }) {
  return (
    <>
      <div className="container flex flex-wrap justify-center items-center gap-8">
        {posts.map((post) => (
          <PostCard key={post.$id} post={post} />
        ))}
      </div>
    </>
  );
}

export default AllPosts;
