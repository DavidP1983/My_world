import Home from "../pages/Home";
import Posts from "../pages/Posts";
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import ErrorMessage from "../components/UI/error/ErrorMessage";

export const privateRroutes = [
    { path: '/about', component: About },
    { path: '/posts', component: Posts },
    { path: '/posts/:id', component: PostIdPage },
    { path: '*', component: ErrorMessage },
];

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
];