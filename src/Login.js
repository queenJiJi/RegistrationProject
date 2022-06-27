import briphylogo from './briphylogo.png';
import {useForm} from 'react-hook-form';
import React,{useEffect, useState} from 'react';

import './Login.css';


const Login = ()=> {

  const {register,formState:{errors},watch,handleSubmit,setValue} = useForm();
  const [checked,setChecked] = useState(false);
  const [ID,setID] = useState("");

  //check if the object is empty
  const isObjEmpty = obj => {
    if (obj === undefined || obj === null) return true
    else return Object.keys(obj).length === 0
  }

  //cick toggle method
  const handleClick=()=>{
    setChecked(!checked);}
  
  //save the ID on the localstorage
  // const saveID = (val)=>
  // {
  //   // setID(e.target.value)
  //   // console.log(val);
  //   const bringID=JSON.parse(localStorage.getItem("user"));
  //   console.log("bringID",bringID.id);
   
  //   if(checked===true){
  //     if(!isObjEmpty(val)){
  //       // if(!(errors.ID) && !(errors.password) && !(errors.ID.type==="pattern")) 1{
  //       // const userId = {ID:val};
  //       if(bringID.id===val)
  //       {
  //         console.log("success");
  //         localStorage.setItem("userID",val);
  //       }
  //     // }
  //   }}
  // }

  const saveID = (val)=>
  {
    // setID(e.target.value)
    // console.log(val);
    const bringID=JSON.parse(localStorage.getItem("user"));
    // console.log("bringID",bringID.id);
   
      if(!isObjEmpty(val)){
        // if(!(errors.ID) && !(errors.password) && !(errors.ID.type==="pattern")) 1{
        // const userId = {ID:val};
        if(bringID.id===val)
        {
          console.log("로그인에 성공했습니다");
          if(checked===true){
            localStorage.setItem("userID",val);
          }
        }
        else{console.log("로그인에 실패했습니다")}
      // }
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

    // const saved=JSON.parse(localStorage.getItem('userID')); //굳이 이렇게 parse를 해서 object로 불러올 필요없음

    //key값 : userID
    const saved=localStorage.getItem('userID');
    // console.log('saved : ', saved);
    if(saved)
    {
      //setValue- Update field value (https://react-hook-form.com/api/useform/setvalue)
      //register했었던 이름(ID/password)을 찾아서 그곳에 saved값을 저장해줌 
      setValue("ID",saved) //setValue: useForm에 있는 속성 중 하나로 useState처럼 reder할때마다 set되었던 value를 가져와줌
      setID(saved); 
    }
  },[]);

  const onSubmit=(data,event)=>{
    event.preventDefault();
    // console.log('data:',data)
    saveID(data.ID);
  }

  return (
    <div className="App">
        <img src={briphylogo} className="App-logo" alt="logo" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          name="ID"
          placeholder="아이디를 입력하세요"
          id="ID"
          // autoFocus="autoFocus"
          // type="ID"
          // defaultValue={ID}
          {...register("ID",
          {
            required:true,
            maxLength:{value:8},
            // pattern: /^\S+@\S+$/i
          })}
          // onChange={(e)=>setID(e.target.value)}
        />
        {errors.ID && errors.ID.type==="required" && <p id="warn">필수로 입력하셔야 합니다.</p>}
        {errors.ID && errors.ID.type==="maxLength" && <p id="warn">아이디를 올바르게 입력하세요</p>}
         {/* 여기서 마지막 <p></p>부분은 항상 참일테니까(그냥 선언문이니까) 앞에서 모두true면 뜰것이고, 하나라도 false면 안뜰것임  */}
        <br />

        <input 
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          id="password"

          {...register("password",{
              required:true
          })}
        />
        {errors.password && errors.password.type==="required" && <p id="warn">필수로 입력하셔야 합니다.</p>}


        <br />

        <div className="remeber">
          <input 
            name="remember"
            type="checkbox"
            id="remember"
            checked={checked}
            onChange={handleClick}
          /> <label htmlFor="remember">기억하기</label>
         

            {/* <p id="find">아이디/비밀번호 찾기</p> */}
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
      </form>
    </div>
  );
}

export default Login;
