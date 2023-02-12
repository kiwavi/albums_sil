import './App.css'; import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from './IndexPage';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import PageNotFound from './PageNotFound';
import RequireAuth from './requireAuth';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import UserDetails from './userDetails';

import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000";

export default function App() {
    return (
        <Router>
          <div class="min-h-screen flex flex-col">
            <div class="main flex-grow">
              <NotificationContainer/>
              <Header/>
              <Routes>
                <Route path="/" element={<IndexPage/>}>  </Route>
                <Route path="/users/:email" element={<RequireAuth> <UserDetails/> </RequireAuth>}>  </Route>
                <Route path="/login" element={<Login/>}>  </Route>
                <Route path="/home" element={<RequireAuth> <Home/> </RequireAuth> }> </Route>
                <Route path="/signup" element={<Signup/>}>  </Route>
                <Route path="*" element={<PageNotFound/>}>  </Route>                
              </Routes>
            </div>
            <Footer/>
          </div>
        </Router>
    );
}
