import briphylogo from './briphylogo.png';
import eyepic from './Components/eye.png';
import closedEyepic from './Components/closedeye.png'
import {useForm} from 'react-hook-form';
import React,{useEffect, useState} from 'react';
import Modal from './Components/Modal';
import './Login.css';
import Font from 'react-font';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Login = ()=> {

  const {register,formState:{errors},watch,handleSubmit,setValue} = useForm();
  const [checked,setChecked] = useState(false);
  const [ID,setID] = useState("");
  const [showmodal,setShowmodal]=useState(false);
  const [loginSuccess,setloginSuccess] = useState(false);
  let YN = true;
  const [eye,setEye] = useState(true);
  const [inputType,setinputType] = useState("password");

  //showing the pop up modal
  const openModal = (YN)=>
  {
    if(YN===true){
      setShowmodal(true);
      setloginSuccess(true);
    }
    else
    {
      setShowmodal(true);
      setloginSuccess(false);
    }
  }


  //change and set the timer for the modal pop up
    //showmodal이 true일 때만 setTimeout작동.
    //버튼클릭시 showmodal = true
      //=> 3초후 showmodal이 false가 되면서 모달창 닫힘.
      //=>컴포넌트가 언마운트 되면서 clearTImeout.
    //언마운트 후 다음 렌더링에서는 showmodal이 false이기 때문에 setTimeout이 작동하지 않습니다.
  useEffect(()=>{
    const notiTimer=setTimeout(()=>
    {setShowmodal(false);},3000);
    return ()=>clearTimeout(notiTimer);
  },[showmodal]);

  //check if the object is empty
  const isObjEmpty = obj => {
    if (obj === undefined || obj === null) return true
    else return Object.keys(obj).length === 0
  }

  //click toggle method
  const handleClick=()=>{
    setChecked(!checked);}
  
  //Eyeclick toggle method
  const eyeClicked=()=> 
  {
    setEye(!eye);
    inputTypeSetter()
    console.log("input type is:",inputType);
  }

  const inputTypeSetter =()=>
  {
    if(eye===true)
    {
      setinputType("text");
    }
    else{
      setinputType("password");
    }
  }
  
  const saveID = (val)=>
  {
    const bringInfo=JSON.parse(localStorage.getItem("user"));

      if(!isObjEmpty(val)&& !isObjEmpty(bringInfo)){
        if(bringInfo.id===val.ID && bringInfo.pw===val.PW)
        {
          console.log("로그인에 성공했습니다");
          openModal(YN);
          if(checked===true){
            localStorage.setItem("loginInfo",JSON.stringify(val));
          }
          window.open('https://www.briphy.com/');
        }
        else{
          openModal(!YN);
          console.log("로그인에 실패했습니다")
        }
      }
      else{
        alert("등록된 회원정보가 없습니다.\n회원가입을 해주시기 바랍니다");
      }
  }

    //이런식으로 handleChange를 쓰면 useForm/watch랑 충돌 나서 {errors.~.message}에러 메세지가 제대로 뜨지 않음
  // const handleChange=(e)=>
  // {
  //   setID(e.target.value);
  //   // console.log(ID);
  // }
 
  const nullFn=()=>{
    // localStorage.clear();
    // console.log("null")
  }

  watch("ID");
  watch("password");

  //새로고침 할 때 localstorage에 저장되어있던 ID값이 기억하기 해서 남아있을 것
  useEffect(()=>{

    // const savedId=JSON.parse(localStorage.getItem('loginInfo')); //굳이 이렇게 parse를 해서 object로 불러올 필요없음

    //key값 : loginInfo
    const savedId=JSON.parse(localStorage.getItem('loginInfo'));
    // console.log('savedId : ', savedId);
    if(savedId)
    {
      //setValue- Update field value (https://react-hook-form.com/api/useform/setvalue)
      //register했었던 이름(ID/password)을 찾아서 그곳에 saved값을 저장해줌 
      setValue("ID",savedId.ID) //setValue: useForm에 있는 속성 중 하나로 useState처럼 reder할때마다 set되었던 value를 가져와줌
      setID(savedId.ID); 
    }
  },[]);

  const onSubmit=(data,event)=>{
    event.preventDefault();
    // console.log('data:',data)
    const info={
      ID:data.ID,
      PW:data.password
    }
    saveID(info);
  }

  return (
  <div className="WholeContainer">
    <Link to="/edituserInfo" 
      style={{color:"lightgrey",
              position:'relative',
              left:"795px",
              top: "18px"
          }}>회원정보수정하기</Link>
    <div className="App">
        <img src={briphylogo} className="App-logo" alt="logo" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>

          <div className="inputBoxes">
            <input 
              name="ID"
              placeholder="아이디를 입력하세요"
              id="ID"
              {...register("ID",
              {
                required:true,
                maxLength:{value:8},
              })}
            />
            {errors.ID && errors.ID.type==="required" && <p id="warn">필수로 입력하셔야 합니다.</p>}
            {errors.ID && errors.ID.type==="maxLength" && <p id="warn">아이디를 올바르게 입력하세요</p>}
            {/* 여기서 마지막 <p></p>부분은 항상 참일테니까(그냥 선언문이니까) 앞에서 모두true면 뜰것이고, 하나라도 false면 안뜰것임  */}
            <br />
            
            <div>
              <input 
                name="password"
                // {eye===true?type="text":type="password"}
                type={inputType}
                placeholder="비밀번호를 입력하세요"
                id="password"

                {...register("password",{
                    required:true
                })} />
              <Eyebtn type="button" onClick={eyeClicked}> 
                {eye===true? <img src={eyepic} className="eyepic" alt="eyepic" /> :
                            <img src={closedEyepic} className="closedEyepic" alt="closedEyepic" />} 
              </Eyebtn>
              {errors.password && errors.password.type==="required" && <p id="pwdWarn">필수로 입력하셔야 합니다.</p>}
            </div>
          </div>
          <br />
          <div>

            <DownWrapper>
            <div className="remeber">
              <input 
                name="remember"
                type="checkbox"
                id="remember"
                checked={checked}
                onChange={handleClick}
              /> <label htmlFor="remember">기억하기</label>
            
                <a href="/find" id="find">아이디/비밀번호 찾기</a>
            
            </div>

            <input 
              name="log-in"
              type="submit"
              value="로그인하기"
              id="log-in"

              onClick={checked===true? saveID : nullFn}
            /> 

            <input 
              name="register"
              type="button"
              value="회원가입하기"
              id="register"

              onClick={()=>window.open("http://localhost:3000/register")}
            />

            {/* {checked===false?localStorage.getItem("ID"):"something went wrong" } */}
            </DownWrapper>
          </div>
        </div>
      </form>

      <div><Font family='Jua'>
        {showmodal && loginSuccess && <Modal message="로그인에 성공했습니다"/>} 
        {showmodal && !(loginSuccess)&& <Modal message="로그인에 실패했습니다" />}
      </Font></div>

    </div>

  </div>
  );
}

const Eyebtn = styled.button`
  position: relative;
  bottom: 44px;
  left: 301px;
  width: 38px;
  height: 33.5px;
  border-radius: 4px;
  border: 0.4px solid black;
  background: white;
`

const DownWrapper =styled.div`
  // background:peru;
  margin-top:-20px;
`

export default Login;

