import * as React from 'react';
import {useEffect} from 'react'
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import Font from 'react-font'


function ConfirmPage()
{
  const navigate=useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const isObjEmpty = obj => {
    if (obj === undefined || obj === null) return true
    else return Object.keys(obj).length === 0
  }

  //Move to the login page
  const loginClickHandler=()=>{
    console.log("loginclickhandler issue")
    navigate('/');
  }

  //Move to the 회원정보수정 page
  const editClickHandler=()=>{
    console.log("editClickHandler issue")
    navigate('/edituserInfo');
  }

  //get user Info from local storage
  const getUserInfo = () => 
  {
      if(!isObjEmpty(userInfo))
      { 
        console.log("userInfo : ", userInfo)
      }
  }
  
  useEffect(()=>{
    getUserInfo();
  },[]);


  return(
    <Container>
       <Wrapper>
          <div className="confirm">Confirmation</div>

          <Contentbox>
              <Font family='Jua'>  
              <span style={{color:"black", fontSize:"20px"}}>환영합니다! <br />회원가입이 완료되었습니다.</span>
              </Font>
              <p></p>
              < br />

          <label htmlFor="confirmName" className="confirmName"> 🍀 이름: </label>
          <Info 
              name="confirmName"
              id="confirmName">
            {(userInfo.name)}
          </Info>
        
          <br/>
          <br />

          <label htmlFor="confirmID" className="confirmID"> 🍀 아이디: </label>
          <Info
              name="confirmID"
              id="confirmID">
             {(userInfo.id)}
          </Info>
       
          <br />
          <br />

         

          <label htmlFor="confirmPhn" className="confirmPhn"> 🍀 전화번호: </label>
     
          <Info 
              name="confirmPhn"
              id="confirmPhn" >
             {(userInfo.phone)}
          </Info>
          <br /><br />
          
          <Button type="button" onClick={loginClickHandler}>로그인하기</Button>
          {"\u00a0"} 
          {"\u00a0"}
          <Button type="button" onClick={editClickHandler}>수정하기</Button>
         
          </Contentbox>
       </Wrapper>
    </Container>
  );
}

export default ConfirmPage;

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 38%;
  left: 50%;

  transform: translate(-50%,-50%);
  background: #fff;
  border-radius: 15px;
  margin-top:30px;
  background-color: #FCF9FA;
  width: 600px;
  height: 480px;
`

const Wrapper = styled.div`
  position: relative;
  width: 600px;
  height:700px;

  .confirm {
      font-weight:800;
      font-size:40px;
      color:black;
      text-align:center;
      margin-top:30px;}
  }
`

const Contentbox = styled.div`
  height: 300px;
  margin-top:20px;
  text-align:center;
  padding: 17px 30px;
  


  .confirmID, .confirmName, .confirmPhn {
  color:black;
  font-weight:800;
  font-size: 15px;
  margin-bottom:50px;
  border-radius:4px;
  position: sticky;
  right: 26%;
  }

  // .confirmName {left:-29.5%}
  // .confirmID {left:-28%}
  // .confirmPhn {left:-26.5%}

`

const Info = styled.span`
  // width:70%;
  // height:20px;
  background:#f2d5d5;
  // right:40%;
  
  // border-radius: 4px;
  border: 1px solid #f7f3f3;
  padding: 8px 30px;
  font-size: 14px;
  font-weight:600;
  max-width: 400px;
  display:inline;
  color:black;
  position:sticky;
  left:78%;
`


const Button = styled.button`
  width: 40%;
  height: 46px;
  border-radius: 24px;
  background: #F08080;
  color: #fff;
  margin-top:27px;
  font-size:21px;
  border: 1px solid #BD5E7A;
  &:hover{
      background:#ea657c;
  }
  font-family:'Jua';
`



