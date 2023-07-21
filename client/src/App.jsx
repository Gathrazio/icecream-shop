import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import SignIn from './components/SignIn'
import Titlebar from './components/Titlebar'
import Footer from './components/Footer'
import NavPage from './components/NavPage'
import './App.css'


export default function App() {
    const [verifiedUserInfo, setVerifiedUserInfo] = useState({});

    function designateVUI (userDoc) {
        setVerifiedUserInfo(userDoc)
    }

    // verifiedUserInfo,
    // userCart,
    // navOK,
    // designateVUI,
    // toggleNavOK,
    // toggleReloadTrigger

  return (
    <div className="app-wrapper">
      <Titlebar />
      <Router>
        <div className="router-wrapper">
          <Routes>
            <Route 
              path="/"
              element={
                <SignIn
                  verifiedUserInfo={verifiedUserInfo}
                  designateVUI={designateVUI}
                />
              }
            />
            <Route 
              path="/navigation/:userID"
              element={
                <NavPage
                  designateVUI={designateVUI}
                  verifiedUserInfo={verifiedUserInfo}
                />
              }
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  )
}