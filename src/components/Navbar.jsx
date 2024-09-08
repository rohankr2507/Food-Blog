import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { client, database } from "../appwrite/appwrite";
import conf from "../conf/conf";

function Navbar() {
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const clearInput = () => {
      setSearchResults([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    // Adding event listener to the window object
    window.addEventListener("click", clearInput);
  }, [inputRef]);

  const searchPost = async (e) => {
    const query = e.target.value.toLowerCase();

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      // Fetch posts
      const response = await database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );

      // Filter posts based on search query
      const filteredPosts = response.documents.filter((post) =>
        post.title.toLowerCase().includes(query)
      );

      // Update search results state
      setSearchResults(filteredPosts);
    } catch (error) {
      console.log("Error in searching post:", error);
    }
  };

  // Clear the value of the input field
  const handleClick = () => {
    // console.log(inputRef.current);
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchResults([]);
    }
  };

  return (
    <div className="container flex justify-around items-center h-20 bg-gradient-to-r from-violet-200 to-pink-200 font-poppins text-gray-800">
      <Link to={"/"}>
        <p className="text-2xl font-medium">FoodWithRuby</p>
      </Link>

      {/* Implementing Search Bar */}
      <input
        type="text"
        className="bg-slate-100 px-4 py-2 w-1/4 rounded-lg border-none focus:outline-none hidden lg:block"
        placeholder="Type here to search..."
        onChange={searchPost}
        ref={inputRef}
      />

      <div
        className={`bg-slate-100 border rounded-lg z-10 absolute top-16 left-96 w-1/2 ${
          searchResults.length > 0 ? "block" : "hidden"
        }`}
      >
        <ul className="p-2 flex flex-col items-center justify-center text-sm gap-2">
          {searchResults.length > 0 ? (
            searchResults.map((post) => (
              <li key={post.$id} className="w-full text-center">
                <Link to={`/search/post/${post.title}`} onClick={handleClick}>
                  {post.title}
                </Link>
              </li>
            ))
          ) : (
            <li>No results found...</li>
          )}
        </ul>
      </div>

      {/* Implementing search icon for mobile devices */}
      <Link to={"/search"}>
        Search
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-gray-800 block lg:hidden"
        />
      </Link>

      {/* For laptop & other devices */}
      <Link
        to={"https://youtube.com/@foodwithruby?si=SAFZSG6dwC69tK54"}
        data-tooltip-id="youtube-tip"
        data-tooltip-content={"Follow for more foodie content..."}
        className="hidden lg:block"
      >
        <p className="font-medium">
          Youtube{" "}
          <FontAwesomeIcon icon={faYoutube} style={{ color: "#ff0000" }} />
        </p>
      </Link>
      <Tooltip id="youtube-tip" />

      {/* For mobile devices */}
      <Link
        to={"https://youtube.com/@foodwithruby?si=SAFZSG6dwC69tK54"}
        data-tooltip-id="youtube-tip"
        data-tooltip-content={"Follow for more foodie content..."}
        className="block lg:hidden"
      >
        <p className="font-medium text-xl">
          <FontAwesomeIcon icon={faYoutube} style={{ color: "#ff0000" }} />
        </p>
      </Link>
      <Tooltip id="youtube-tip" />
    </div>
  );
}

export default Navbar;
