import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { db } from "../../config/firebase"
import { storage } from "../../config/firebase"
import { ref,uploadBytes,getDownloadURL } from "firebase/storage"
import { addDoc, collection, getDocs,query,where,doc,deleteDoc, updateDoc, setDoc } from "firebase/firestore"


export const updatePost = createAsyncThunk(
    "feed/updatePost",
    async(post)=>{
        try {
            const docRef= doc(db,"posts",post.id);
            await updateDoc(docRef,post)
            return post;
        } catch (error) {
            console.log(error)
        }
    }
)

export const deletePost = createAsyncThunk(
    "feed/deletePost",
    async(id)=>{
        try {
            const deleteRef = doc(db,"posts",id)
            await deleteDoc(deleteRef)
            return id;
        } catch (error) {
            console.log(error)
        }
    }
)

export const createPost = createAsyncThunk(
    "feed/createPost",
    async(post) => {
        try {
            post.setLoading(true)
            const fileRef= ref(storage, "images/"+post.file.name)
            const metadata = {
                contentType:post.file.type
            }
            await uploadBytes(fileRef,post.file,metadata)
            const url = await getDownloadURL(fileRef)
            let updatedPost ={
                uid:post.uid,
                title:post.title,
                description:post.description,
                createAt: new Date(),
                imageURL:url
            }

            const collectionRef= collection(db, "posts")
            const response= await addDoc(collectionRef,updatedPost)
            console.log("response after firebase store", response)
            post.setLoading(false)
            return updatedPost


        } catch (error) {
            console.log("Error is: ",error)
        }

    }
)

export const getPosts = createAsyncThunk (
    "feed/getPosts",
    async ()=>{
        try {
            const collectionRef = collection(db,"posts")
            const queryRef = query(collectionRef,where("comments","array-contains","abc"))
            const docs= await getDocs(collectionRef)
            let data=[]
            
            docs.forEach((doc)=>{
                data.push({
                    id:doc.id,
                    ...doc.data()
                })
            })
            return data;
        } catch (error) {
            console.log(error);
            
        }
    }
)


const feedSlice = createSlice (
    {
        name:"feed",
        initialState:{
            feed:[],
            updatePost: null,
            
        },
        reducers: {
            addFeed: (state,action)=>{
                console.log("Action in feed" , action.payload)
            },
            updateDocId: (state,action)=>{
                let post=state.feed.filter((post)=>post.id===action.payload)
                state.updatePost=post[0]
            },
            
        },
        extraReducers: (builder) => {
            builder.addCase(createPost.fulfilled, (state,action)=>{
                state.feed = [action.payload, ...state.feed]
            })
            builder.addCase(getPosts.fulfilled, (state,action)=>{
                state.feed=action.payload
            })
            builder.addCase(deletePost.fulfilled,(state,action)=>{
                
                state.feed=state.feed.filter((post)=>post.id!==action.payload)
            })
            builder.addCase(updatePost.fulfilled,(state,action)=>{
                state.feed=state.feed.map((post)=>{
                    if(post.id===action.payload.id){
                        return action.payload;
                    }
                    return post;
                })
                state.updatePost=null
            })
           
        }
    }
)


export const { addFeed,updateDocId } = feedSlice.actions;
export default feedSlice.reducer;