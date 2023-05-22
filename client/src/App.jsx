import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './App.scss'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import InvolvedPage from './pages/InvolvedPage';
import EventPage from './pages/EventPage';
import Dashboard from '../admin/src/pages/Dashboard';
import Layout from './components/Layout';
import AdminLayout from '../admin/components/AdminLayout';
import AdminSponsor from '../admin/src/pages/AdminSponsor';
import AdminEvents from '../admin/src/pages/AdminEvents';
import AdminBlog from '../admin/src/pages/AdminBlog';
import AdminMembers from '../admin/src/pages/AdminMembers';
import AdminSettings from '../admin/src/pages/AdminSettings';
import AdminLogin from '../admin/src/pages/AdminLogin';
import BlogPage from './pages/BlogPage';
import BlogArticle from './pages/BlogArticle';
import UserProfile from './pages/UserProfile';
import UserEvents from './pages/UserEvents';
import UserSponsor from './pages/UserSponsor';
import SponsorPage from './pages/SponsorPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AdminRegister from '../admin/src/pages/AdminRegister';
import axios from 'axios';
import { AdminContextProvider, UserContextProvider } from '../context/PublicContext';
import ArticleEdit from './pages/ArticleEdit';
import ProfileEdit from './components/ProfileEdit';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          {/* user */}
          <Route path="/" element={<Layout />} >
            <Route index element={<IndexPage />} />
            <Route path="/involved" element={<InvolvedPage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/event/:id/user/:uid" element={<ArticleEdit />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogArticle />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/user/:id/events" element={<UserEvents />} />
            <Route path="/user/:id/sponsor" element={<UserSponsor />} />
            <Route path="/user/:id/edit" element={<ProfileEdit />} />
            <Route path="/sponsor" element={<SponsorPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserContextProvider>
      <AdminContextProvider>
        <Routes>
          {/* admin */}
          <Route path="/admin/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/sponsor" element={<AdminSponsor />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
        </Routes>
      </AdminContextProvider>
    </BrowserRouter>


  )
}

export default App
