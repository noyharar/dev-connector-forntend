import React, {Fragment, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getPost } from '../../actions/post'
import { PostItem } from '../posts/PostItem'
import {useParams} from "react-router";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";


const Post = ({ getPost, post : { post, loading}}) => {
    const { id } = useParams();

    useEffect(() => {
        getPost(id)
    });
    return loading || post === null ? <Spinner/> :(
        <Fragment>
            <Link to='/posts' className='btn'>Back to posts</Link>
            <PostItem post={post} showActions={false}/>
        </Fragment>
    )
};

Post.propTypes = {
    getPost : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post : state.post
});

export default connect(mapStateToProps,{getPost})(Post);