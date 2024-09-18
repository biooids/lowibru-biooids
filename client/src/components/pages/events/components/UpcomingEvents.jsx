import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UpcomingEventsCard from "./UpcomingEventsCard";

function UpcomingEvents() {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState(null);
  const fetchUpcomingPosts = async () => {
    try {
      const data = await fetch("/api/post/getPosts?category=upcoming");
      const res = await data.json();
      console.log(res.posts);
      setPosts(res.posts);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    fetchUpcomingPosts();
  }, []);

  return (
    <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <UpcomingEventsCard
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
            schedule={post.schedule}
            isLiked={
              currentUser ? post.likes.includes(currentUser.user._id) : false
            }
            fetchedLikes={post.numberOfLikes}
            isSaved={
              currentUser ? post.saves.includes(currentUser.user._id) : false
            }
            fetchedSaves={post.numberOfSaves}
          />
        ))
      ) : (
        <p> loading or no posts found</p>
      )}
    </section>
  );
}

export default UpcomingEvents;
