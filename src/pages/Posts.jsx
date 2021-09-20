import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from '../hooks/useObserver'
import MySelect from "../components/UI/select/MySelect";

function Posts() {

    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    useEffect(() => {
        fetchPosts()
    }, [page, limit])

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })



    useObserver(lastElement, page < totalPages, isPostsLoading, () => {setPage(page+1)})




    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton onClick={() => setModal(true)}>Create Post</MyButton>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            {postError &&
                <h1>Error:<br/>{postError}</h1>
            }

            <MySelect
                value={limit}
                onChange = {value => setLimit(value)}
                defaultValue={"Posts to load: "}
                options={[
                    {value: 5, name: '5'},
                    {value: 20, name: '50'},
                    {value: 20, name: '50'},
                    {value: -1, name: 'all'}
                ]}
                disabledTitle = "Posts per load"
            />

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post List"/>
            <div ref={lastElement} style={{height: '50px', background:'red'}}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
                    <Loader/>
                </div>
            }
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={setPage}
            />
        </div>
    );
}

export default Posts;
