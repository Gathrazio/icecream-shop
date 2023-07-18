import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import { UserContextProvider } from './components/userContext.jsx'
import SignIn from './components/SignIn'
import Titlebar from './components/Titlebar'
import Footer from './components/Footer'
import NavPage from './components/NavPage'
import './App.css'


export default function App() {
  return (
    <div className="app-wrapper">
      <Titlebar />
      <Router>
        <div className="router-wrapper">
          <Routes>
            <Route 
                path="/"
                element={
                  <UserContextProvider>
                    <SignIn />
                  </UserContextProvider>
                }
            />
            <Route 
                path="/navigation"
                element={<NavPage />}
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  )
}