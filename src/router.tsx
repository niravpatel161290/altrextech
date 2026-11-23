import { lazy } from "react";
import { createBrowserRouter, useParams } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

// Route-level code splitting: each page is loaded on demand.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const SolutionPage = lazy(() => import("./pages/SolutionPage"));
const SolutionsOverview = lazy(() => import("./pages/SolutionsOverview"));
const ServicesOverview = lazy(() => import("./pages/ServicesOverview"));
const IndustriesOverview = lazy(() => import("./pages/IndustriesOverview"));
const ServicePage = lazy(() =>
  import("./pages/ServicePage").then((m) => ({ default: m.ServicePage }))
);
const IndustryPage = lazy(() => import("./pages/IndustryPage"));
const LiveDemoOverview = lazy(() => import("./pages/LiveDemoOverview"));
const BlogOverview = lazy(() => import("./pages/BlogOverview"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const SolutionPageWithKey = () => {
  const { slug } = useParams<{ slug: string }>();
  return <SolutionPage key={slug} />;
};

const ServicePageWithKey = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ServicePage key={slug} />;
}

const IndustryPageWithKey = () => {
  const { slug } = useParams<{ slug: string }>();
  return <IndustryPage key={slug} />;
}

const BlogPostWithKey = () => {
  const { slug } = useParams<{ slug: string }>();
  return <BlogPost key={slug} />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/solutions", element: <SolutionsOverview /> },
      { path: "/solutions/:slug", element: <SolutionPageWithKey /> },
      { path: "/services", element: <ServicesOverview /> },
      {
        path: 'services/:slug',
        element: <ServicePageWithKey />
      },
      { path: "/industries", element: <IndustriesOverview /> },
      {
        path: 'industries/:slug',
        element: <IndustryPageWithKey />
      },
      { path: "/live-demo", element: <LiveDemoOverview /> },
      { path: "/blog", element: <BlogOverview /> },
      { path: "/blog/:slug", element: <BlogPostWithKey /> },
    ],
  },
]);