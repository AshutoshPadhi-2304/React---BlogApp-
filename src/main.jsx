import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Home from './components/pages/Home.jsx'
import Signup from './components/pages/Signup.jsx'
import Login from './components/Login.jsx'
import AddPost from "./components/pages/AddPost.jsx";
import EditPost from "./components/pages/EditPost.jsx";
import Post from "./components/pages/Post.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Home />
      },
      {
        path : '/login',
        element : (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
        )
      },
      {
        path : '/signup',
        element : (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
      )
      },
      {
        path : '/add-post',
        element : (
          <AuthLayout authentication={true}>
            {" "}
            <AddPost />
          </AuthLayout>
      )
      },
      {
        path : '/edit-post/:slug',
        element : (
          <AuthLayout authentication={true}>
            {" "}
            <EditPost />
          </AuthLayout>
      )
      },
      {
        path : '/post/:slug',
        element : <Post />
      },
      {
        path : '/all-posts',
        element : (
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
      )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
   
  </React.StrictMode>,
)
