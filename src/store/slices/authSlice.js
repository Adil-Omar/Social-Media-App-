import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";


export const getCurrentUser = createAsyncThunk(
    "auth/currentUser",
    async (setLoading,store) => {
        try {
            setLoading(true)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                let docSnap = await getDoc(doc(db, "users", uid))
                const dbUser = docSnap?.data()
                store.dispatch(setUser(dbUser))
                console.log("DB USer", dbUser);
                
                setLoading(false)
                
            }else{
                setLoading(false)
                
            }
        })
        return 
        } catch (error) {
            setLoading(false)
            console.log(error);
            
        }
    }
)

export const signup = createAsyncThunk(
    "auth/signup",
    async (user) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
            let saveUserToDb = {
                email: user.email,
                password: user.password,
                userName: user.userName,
                gender: user.gender,
                uid: userCredential.user.uid,
                pPic: user.profilePic
            }
            const docRef = doc(db, "users", userCredential.user.uid)
            await setDoc(docRef, saveUserToDb)
            return saveUserToDb
        } catch (error) {
            console.log(error)
        }
    }
)
export const login = createAsyncThunk(
    "auth/login",
    async (user,setError) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password)
            let docSnap = await getDoc(doc(db, "users", userCredential.user.uid))
            const dbUser = docSnap?.data()
            console.log("DB USer", dbUser);

            return dbUser;
        } catch (error) {
            console.log(error);
            setError(error.toString())

        }
    }
)
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            signOut(auth)
            return true;
        } catch (error) {
            console.log(error);

        }
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, action) => {
            console.log("Signup fulfilled:", action.payload);
            state.user = action.payload;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            console.log("Signup fulfilled:", action.payload);
            state.user = action.payload;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = null;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})
export const { setUser } = authSlice.actions
export default authSlice.reducer