import React from "react";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function PostDetail({ post }) {
  return (
    <>
      <div className="container font-poppins text-gray-800">
        <div className="text-center font-medium text-xl lg:text-3xl">
          {post.title}
        </div>
        <div className="container flex justify-center items-center p-8">
          <img
            src={post.imageURL}
            alt={post.title}
            className="lg:w-1/2 sm:w-full rounded-lg"
          />
        </div>
        <div className="font-normal text-xs lg:text-sm">
          {parse(post.content)}
        </div>

        <div className="container flex justify-center items-center pt-4">
          <Link
            to={post.youtubeURL}
            className="bg-gradient-to-r from-violet-200 to-pink-200 px-4 py-2 rounded-lg text-xs lg:text-sm"
          >
            <FontAwesomeIcon icon={faYoutube} style={{ color: "#ff0000" }} />{" "}
            Youtube Video Here...
          </Link>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
