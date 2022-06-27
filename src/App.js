/* eslint-disable react/style-prop-object */
import React from 'react'
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import Login from './Login';
import Find from './Finding/Find';
import SignUp from './SignUp';
import Font from 'react-font'
import ConfirmPage from './Confirmpage';
import EdituserInfo from './EdituserInfo';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/find" element={
            <main style={{ padding: "1rem", color:"white" }}>
               <Link to="/" 
               style={{ textDecoration: 'none',
                        textAlign:"left", 
                        position: 'relative', 
                        left:'20px',
                        color:"white",
                        fontSize:"230%",
                        fontWeight:'750',
                        
            }}>BRIPHY</Link>
              <Font family="Jua">
              <h1 className="title"style={{textAlign:"center"}}>아이디/비밀번호 찾기</h1>
              </Font>
              <Find />
            </main>
            } />
          <Route path="/confirm" element={
            <main style={{ color:"white" }}>
            <Link to="/" 
             style={{ textDecoration: 'none',
                      textAlign:"left", 
                      position: 'relative', 
                      left:'20px',
                      color:"white",
                      fontSize:"230%",
                      fontWeight:'750',
                      
          }}>BRIPHY</Link>
          <ConfirmPage/>
            </main>
          } />

          <Route path="/edituserInfo" element={
            <main style={{ color:"white" }}>
            <Link to="/" 
             style={{ textDecoration: 'none',
                      textAlign:"left", 
                      position: 'relative', 
                      left:'20px',
                      color:"white",
                      fontSize:"230%",
                      fontWeight:'750',
                      
          }}>BRIPHY</Link>
          <EdituserInfo/>
            </main>
          } />  

          <Route path="/*" element={
            <main style={{ color:"white" }}>
              <Link to="/" 
               style={{ textDecoration: 'none',
                        textAlign:"left", 
                        position: 'relative', 
                        left:'20px',
                        color:"white",
                        fontSize:"230%",
                        fontWeight:'750',
                        
            }}>BRIPHY</Link>
              <SignUp />
            </main>
            } />
        </Routes>
      </BrowserRouter>
  );
};

export default App;