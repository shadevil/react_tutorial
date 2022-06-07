import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import PostService from "./API/PostService";
import { useFetching } from "./components/hooks/useFetching";
import { usePosts } from "./components/hooks/usePosts";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/Loader/Loader";
import MyModal from "./components/UI/MyModal/MyModal";
import "./styles/App.css";
import { getPageCount } from "./utils/pages.js";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  //ДЗ: Использовать useMemo чтобы массив не пересчитывался на каждом рендере 
  let pagesArray = [];
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1);
  }
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));

  });
  console.log(totalPages);
  useEffect(() => {
    fetchPosts();
  }, []);
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  //Get post from child component
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{ marginRight: 10 }} onClick={fetchPosts}>
        GET POSTS
      </MyButton>
      <MyButton style={{ marginTop: 20 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>произошла ошибка ${postError}</h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Посты про js"
        />
      )}
    </div>
  );
}

export default App;
