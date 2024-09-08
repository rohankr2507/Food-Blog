import React from "react";
import { useState, useRef, useEffect } from "react";
import { client, database } from "../appwrite/appwrite";
import conf from "../conf/conf";
import { Link } from "react-router-dom";

const Search = () => {
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
    setSearchResults([]);
    // console.log(inputRef.current);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative flex justify-center items-center p-2 font-poppins">
      <input
        type="text"
        className="bg-slate-100 px-4 py-2 rounded-lg border-none focus:outline-none w-3/4"
        placeholder="Type here to search..."
        onChange={searchPost}
        ref={inputRef}
      />

      <div
        className={`bg-slate-100 border rounded-lg z-10 absolute top-16 w-3/4 ${
          searchResults.length > 0 ? "block" : "hidden"
        }`}
      >
        <ul className="p-1 flex flex-col items-center justify-center text-sm gap-2">
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
    </div>
  );
};

export default Search;
