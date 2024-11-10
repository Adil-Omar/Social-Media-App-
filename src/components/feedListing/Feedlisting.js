import React, { useEffect } from 'react'
import Button from '../button/Button'
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts, updateDocId } from '../../store/slices/feedSlice';
import './feed.css'

export default function Feedlisting() {
  let dispatch = useDispatch()
  let feed =useSelector(store=> store.feedSlice.feed)
  let user =useSelector(store=> store.authSlice.user)

  useEffect(()=>{
    dispatch(getPosts())
  }
  ,[])
  const deleteHandler =(id,uid)=>{
    console.log("Delete ID:", id)
    if(user.uid !== uid){
      alert("you cannot delete this post")
    }else{
      dispatch(deletePost(id))

    }
  }
  const updateHandler =(id)=>{
    console.log("Update ID:", id)
    dispatch(updateDocId(id))
  }

  return (
    <div className="feed-listing-container">
      <h2 style={{textAlign:'center'}} >Feed Listing</h2>
      {feed?.map((post) => (
        <div className="feed-card" key={post?.id}>
          <img className="feed-image" src={post?.imageURL} alt="" />
          <h1>{post?.title} - {post?.createAt?.seconds ? new Date(post?.createAt?.toDate()).toLocaleDateString() : new Date(post?.createAt).toLocaleDateString()}</h1>
          <p>{post?.description}</p>
          {post.uid === user.uid && (
            <>
              <button className="delete-btn" onClick={() => deleteHandler(post.id, post.uid)}>Delete</button>
              <button className="update-btn" onClick={() => updateHandler(post.id)}>Update</button>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
  
}
