import React, { useEffect } from 'react'
import './index.css'
import Layout from './Layout/Layout.jsx'
import { Categories, Home, Login, Signup, Posts, Write, BlogDetail, UserProfile, UpdateUser, HeroPage, About } from './pages/PageIndex.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import authStore from './store/authStore.js'
function App() {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <HeroPage />
        },
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'posts',
          element: <Posts />
        },
        {
          path: `posts/:id`,
          element: <BlogDetail />
        },
        {
          path: 'categories',
          element: <Categories />
        }, {
          path: 'login',
          element: <Login />
        },
        {
          path: 'write',
          element: <Write />
        },
        {
          path: 'register',
          element: <Signup />
        },
        {
          path: 'profile/:userName',
          element: <UserProfile />
        },
        {
          path: 'settings',
          element: <UpdateUser />
        },
        {
          path: 'about',
          element: <About />
        }
      ]
    }
  ])



  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  )

}
export default App