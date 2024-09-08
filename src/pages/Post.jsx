import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client, database } from "../appwrite/appwrite";
import conf from "../conf/conf";
import { Query } from "appwrite";
import PostDetail from "../components/PostDetail";
import ReactLoading from "react-loading";

function Post() {
  const { title } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await database.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          [Query.equal("title", title)]
        );

        // console.log(res.documents[0].$id);

        const id = res.documents[0].$id;

        const response = await database.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          id
        );
        setPost(response);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [title]);

  if (!post) {
    return (
      <>
        <div className="w-full bg-gradient-to-br from-cyan-50 to-pink-50 flex items-center justify-center px-16 py-64 lg:px-24 lg:py-80">
          <ReactLoading type="spin" color="#ce93d8" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full bg-gradient-to-br from-cyan-50 to-pink-50 flex items-center justify-center p-8 lg:p-16">
        <PostDetail post={post} />
      </div>
    </>
  );
}

export default Post;
