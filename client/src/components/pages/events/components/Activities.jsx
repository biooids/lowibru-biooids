import React, { useEffect, useState } from "react";
import ActivitiesCard from "./ActivitiesCard";
import { useSelector } from "react-redux";

function Activities() {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState(null);
  const fetchPosts = async () => {
    try {
      const data = await fetch("/api/post/getPosts");
      const res = await data.json();
      console.log(res.posts);
      setPosts(res.posts);
    } catch (error) {
      console.log("some thing went wrong ", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      {posts ? (
        posts.map((post) => (
          <ActivitiesCard
            key={post._id}
            id={post._id}
            category={post.category}
            content={post.content}
            createdAt={new Date(post.createdAt).toLocaleDateString("en-US")}
            images={post.images}
            title={post.title}
            ended={post.ended}
            slug={post.slug}
            externalLink={post.externalLink}
            saveCount={post.saveCount}
            schedule={post.schedule}
            isLiked={
              currentUser ? post.likes.includes(currentUser.user._id) : false
            }
            fetchedLikes={post.numberOfLikes}
          />
        ))
      ) : (
        <p> loading or no posts found</p>
      )}
    </section>
  );
}

export default Activities;
