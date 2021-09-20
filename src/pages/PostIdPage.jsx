import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {

    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
        const response = await PostService.getCommentsById(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById()
        fetchComments()
    }, [])

    return (
        <div>
            <h1> ID = {params.id}</h1>

            {isLoading
                ? <Loader/>
                : <div>
                    <h2>{post.title}</h2>
                    <h3>{post.body}</h3>
                </div>
            }

            {isCommentsLoading
                ? <Loader/>
                : <div style={{margin: '20px', padding: '0 50px'}}>
                    {comments.map(com =>
                        <span
                            style={{marginTop: '10px', display: 'block'}}
                        >
                                <strong> {com.name} |
                                    <span style={{color: '#909090'}}> {com.email} </span>
                                </strong>
                                <br/> {com.body}
                            </span>)}
                </div>
            }
        </div>
    );
};

export default PostIdPage;