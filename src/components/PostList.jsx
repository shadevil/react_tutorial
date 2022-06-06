import React from "react";
import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";
import PostItem from "./PostItem";
const PostList = ({posts, title, remove}) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
      {posts.map((post, index) => (
        <CSSTransition
          key={post.id}
          timeout={500}
          classNames="post">
        <PostItem 
          remove={remove} 
          number={index + 1} 
          key={post.id} 
          post={post} />
        </CSSTransition>
      ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
