import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({ post }) {
  const truncatedContent = post.content.substring(0, 120);

  return (
    <>
      <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-xl shadow-gray-400 mb-6">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-xl shadow-gray-500/60">
          <img src={`${post.imageURL}`} alt="" />
        </div>
        <div className="p-6">
          <h5 className="mb-2 block font-poppins text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {post.title}
          </h5>
          <div className="block font-poppins text-base font-light leading-relaxed text-inherit antialiased">
            {parse(truncatedContent)}...
          </div>
        </div>
        <div className="p-6 pt-0">
          <Link
            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-poppins text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            to={`/post/${post.title}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </>
  );
}

export default PostCard;
