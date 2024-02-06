import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'
import Single from './pages/Single'
import Write from './pages/Write'
import Home from './pages/Home'
import Saved from './pages/Saved'
import Navbar from './components/Navbar'
import './style.scss'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

const Dashboard = () => {
  return (
  <>
      <Navbar />
      <Outlet />
  </>
  )
} 


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/routine/:id",
        element: <Single />
      },
      {
        path: "/write",
        element: <Write />
      },
      {
        path: "/saved",
        element: <Saved />
      }
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
