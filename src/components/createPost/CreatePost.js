import * as yup from 'yup';
import Button from '../button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../store/slices/feedSlice'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { useEffect, useState } from 'react';
import './CreatePost.css'

export default function CreatePost() {
  let post = useSelector(store => store.feedSlice.updatePost)
  let user = useSelector(store => store.authSlice.user)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [imageURL, setImageURL] = useState("")
  const [file,setFile] = useState(null)
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setDescription(post.description)
      setImageURL(post.imageURL)
    } else {
      setTitle("")
      setDescription("")
      setImageURL("")
    }
  }, [post])

  const createPostHandler = async () => {


    let postData = {
      uid:user.uid,
      title,
      description,
      imageURL,
      createAt: new Date()
    }

    if (title === "" || description === "") {
      setError("Please fill all fields")
      return;
    }
    try {
      let scheme = yup.object().shape({
        title: yup.string().min(4).max(18).required().typeError("Invalid title"),
        description: yup.string().min(5).required().typeError("Invalid data"),
      })
      await scheme.validate(postData)
      setError('')
      setTitle('');
      setDescription('');

    } catch (error) {
      console.log("Error", error.toString());
      setError(error.toString())
      return;
    }
    if (post) {
      dispatch(updatePost({ ...postData, id: post.id }))
      return
    }
    dispatch(createPost({...postData,file,setLoading}))

  }

  const changeImage = (e) =>{
    const file = e.target.files[0]
    setFile(file)
  }

  const uploadImage = async (e) => {
    try {
      const file = e.target.files[0]
      const metadata = {
        contentType: file.type
      }
      const fileRef = ref(storage, "images/" + file.name)
      const response = await uploadBytes(fileRef, file, metadata)
      console.log("Response: " + response)
      const url = await getDownloadURL(fileRef)
      console.log("Url: " + url)
      setImageURL(url)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      {error && <span className="create-post__error">{error}</span>}
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="create-post__input"/>
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="create-post__textarea"></textarea>
      <input type="file" onChange={changeImage} />
    {loading ? (
      <p>Loading...</p>
    ) : (
      <Button title={post ? "Update Post" : "Create Post"} onClickHandler={createPostHandler} />
    )}
    </div>
  );
}
