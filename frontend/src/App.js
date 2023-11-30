import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'
import Write from './pages/Write'
import Post from './pages/Post'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
} 


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post/:id",
        element: <Post />
      },
      {
        path: "/write",
        element: <Write />
      },
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/write",
    element: <Write />,
  },
  {
    path: "/post",
    element: <Post />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
        </div>
    </div>
  );
}

export default App;
