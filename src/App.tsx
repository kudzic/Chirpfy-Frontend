import {
  Explore,
  Notifications,
  Verified,
  NotificationsList,
  Mentions,
  Login,
  Profile,
  Bookmarks,
  Chat
} from "./pages";
import { lazy, Suspense } from "react";
import { NavSidebar, DirectMessage, Preloading } from "./components";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";




const Home = lazy(() => import("./pages/home"));




function App() {
  // const location = useLocation();
 

  // Function to determine if navbar and direct messages should be displayed
  const showNavbar = () => {
    // Exclude login and signup routes
    return !["/login", "/signup"].includes(location.pathname);
  };

  // Function to determine if DirectMessage component should be displayed
  const showDirectMessages = () => {
    // Exclude /chat, /login, and /signup routes
    return !["/chat", "/login", "/signup"].includes(location.pathname);}
  return (
    <Suspense fallback={<Preloading />}>
    
      <Router>
        <>
        {showNavbar() && <NavSidebar />}
        {showDirectMessages() && <DirectMessage />}
          
         
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notifications />}>
              <Route path="/notifications" element={<NotificationsList />} />
              <Route path="/notifications/verified" element={<Verified />} />
              <Route path="/notifications/mentions" element={<Mentions />} />
            </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/bookmarks" element={<Bookmarks/>}/>
        

          </Routes>
       
          {/* <DirectMessage /> */}
        </>
      </Router>
    </Suspense>
  );
}

export default App;
