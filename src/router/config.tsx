// File: src/router/config.tsx
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import PropertiesPage from "../pages/properties/page";
import PropertyDetailPage from "../pages/property/page";
import AboutPage from "../pages/about/page";
import ServicesPage from "../pages/services/page";
import BlogPage from "../pages/blog/page";
import PostPage from "../pages/blog/PostPage";
import ContactPage from "../pages/contact/page";
import UploadProperty from "../pages/admin/UploadProperty";
import SubmitListingPage from "../pages/submit-listing/page";
import ReviewListings from "../pages/admin/ReviewListings";
import ManageListings from "../pages/admin/ManageListings";   
import EditProperty from "../pages/admin/EditProperty";       
import BlogDashboard from "../pages/admin/BlogDashboard";
import WriteBlogPage from "../pages/admin/WriteBlogPage";
import EditBlogPage from "../pages/admin/EditBlogPage";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminRoute from "../components/feature/AdminRoute"; // <-- Import the Gatekeeper

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/properties", element: <PropertiesPage /> },
  { path: "/properties/:id", element: <PropertyDetailPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/blog/:slug", element: <PostPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/list-with-us", element: <SubmitListingPage /> },
  
  // Admin Routes - All wrapped in the AdminRoute gatekeeper
  { path: "/admin", element: <AdminRoute><AdminDashboard /></AdminRoute> },
  { path: "/admin/upload-property", element: <AdminRoute><UploadProperty /></AdminRoute> },
  { path: "/admin/review-listings", element: <AdminRoute><ReviewListings /></AdminRoute> },
  { path: "/admin/manage-listings", element: <AdminRoute><ManageListings /></AdminRoute> }, 
  { path: "/admin/edit-property/:id", element: <AdminRoute><EditProperty /></AdminRoute> }, 
  { path: "/admin/blog", element: <AdminRoute><BlogDashboard /></AdminRoute> },             
  { path: "/admin/write-blog", element: <AdminRoute><WriteBlogPage /></AdminRoute> },       
  { path: "/admin/edit-blog/:id", element: <AdminRoute><EditBlogPage /></AdminRoute> }, 
  
  { path: "*", element: <NotFound /> },
];

export default routes;