import {useEffect, useState,useRef} from "react";
import styled from 'styled-components';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Controller, useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import FormError from "./Components/FormError";
import * as React from 'react';
import {FormFeedback, Input,InputGroup,InputGroupText} from 'reactstrap';
import openEye from './Components/eye.png'
import closedeye from './Components/closedeye.png'
import TogglePW from "./Components/TogglePW";
import {Eye,EyeOff} from 'react-feather';

function SignUp() 
{   
    const navigate = useNavigate();
    // navigate('/confirmPage');
    
    const [user,setUser] = useState() 
    const {register,watch,formState:{errors},handleSubmit,control} = useForm();
    const [ok,setOk] = useState(false);
    const password=useRef();
    password.current= watch("signupPW");
    
    let phoneNum= watch("signupPhone")
    let phoneString=''+phoneNum
    const confirmNumber=phoneString.substring(phoneString.length-4,phoneString.length);

    let wathchConfirmNum = watch("confirmNum");
    let watchConfirmNumStr = '' +wathchConfirmNum;
    const confirmationNumber = watchConfirmNumStr;

    const [iconVisible,setIconVisible] = useState(false);
    const [inputType,setInputType] = useState("");
    const renderEyeIcon=()=>
    {
        console.log("rendered eyeIcon success")
        if(iconVisible===false)
        {   
            return <EyeOff size="14"/>
        }
        else{
            return <Eye size="14"/>
        }
    }
    
   
    // useEffect(()=>{
    //     localStorage.clear();
    // },[])
    // console.log('userInfo:',user);

    //phoneCheckYn if the object is empty
    const isObjEmpty = obj => {
    if (obj === undefined || obj === null) return true
    else return Object.keys(obj).length === 0
    }
  
    //localStorage에 저장+user객체 set
    const saveUser=(data)=>{
        if(!isObjEmpty(data)){
            localStorage.setItem("user",JSON.stringify(data));
            setUser(data);
        }
    }

    //버튼 클릭시(= form이 submit이 될때) safeuser 호출
    const clickHandler=(val)=>{
        // console.log('clickHandler')
        console.log("ok", ok)
        if(isObjEmpty(errors)&&ok===true){ //error가 없을 때
            const elem = { 
                name: val.signupName,
                id : val.signupID,
                pw: val.signupPW,
                phone: val.signupPhone
            }
            saveUser(elem);
            completedPopup(elem.name);
            navigate('/confirm');
        }
        else return "something went wrong";
    }  

    //전화번호-인증번호 popup창 
    const confirmAlert=()=>
    {   console.log(phoneNum.length);
        if(phoneNum!==undefined && phoneNum !==''&&phoneNum.length===11)
        {
            const id=toast("", {autoClose:0.3})
            toast.update(id,{ render: `인증번호는 : < ${confirmNumber} > 입니다` ,type:"success" },
            {
                autoClose:3000,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
            });
            localStorage.setItem("인증번호",confirmNumber);
        }
        
        else{
            toast.error("Error! 전화번호를 올바르게 입력하세요",
            {
                autoClose:1000,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
            });
        }
    }

    //인증번호 확인 popup창
    const confirmNumOk=()=>
    {
        const getConfirmNumber = localStorage.getItem("인증번호");
        if(getConfirmNumber===confirmationNumber)
        {
            const idd=toast("",{autoClose:0.3})
            toast.update(idd,{ render: `인증이 완료되었습니다` ,type:"success" },
            {
                autoClose:3000,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
            });
            setOk(true);
        }
        else if(confirmationNumber!=='' &&getConfirmNumber!==confirmationNumber) {
            toast.error("인증번호가 틀렸습니다. 다시 시도해주세요",
            {
                autoClose:1000,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
            });
        }

        else if(confirmationNumber==='')
        {
            toast.error("인증번호를 입력하셔야합니다",
            {
                autoClose:1000,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
            });
        }
        else {
            toast.error("인증에 실패했습니다. 인증번호를 입력하세요",
            {
                autoClose:1000,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
            });
          }
        }
   

    //회원가입 완료/실패 popup창
    const completedPopup=(username)=>
    {
        // console.log('phoneCheckYn > ', phoneCheckYn)
        // if(phoneCheckYn) {
            if(isObjEmpty(errors))
            {
                const id=toast("", {autoClose:0.3})
                toast.update(id,{ render: `${username}님, 회원가입이 완료되었습니다` ,type:"success" },
                {
                    autoClose:3000,
                    closeOnClick:true,
                    pauseOnHover:true,
                    draggable:true,
                });
            }
            
            else{
                toast.error("회원가입에 실패하였습니다!",
                {
                    autoClose:1000,
                    closeOnClick:true,
                    pauseOnHover:true,
                    draggable:true,
                } );
            }
    }

    //eyeIcon Click했을때
    const eyeIconSetter=()=>
    {
        if(iconVisible===false){
            setInputType("password");
        }
        else{
            setInputType("text")
        }
    }
    
    const eyeClicked=()=>
    {
        setIconVisible(!iconVisible);
        eyeIconSetter();
    }

    return(
      <Container>
           
        <form onSubmit={handleSubmit(clickHandler)} >
         <Wrapper>
            <div className="signup">Sign Up</div>

            <Contentbox>
            
            <label htmlFor="signupName" className="signupName"> 🍀 이름 </label>
            <div></div>
            <Inputbox
                name="signupName"
                placeholder="이름을 입력하세요" 
                id="signupName"
                {...register("signupName",{
                    required:true,
                    maxLength:{value:5}
                })}
            >
            </Inputbox>
            {errors.signupName && errors.signupName.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>}
            {errors.signupName && errors.signupName.type==="maxLength" && 
                <FormError message="⚠ 이름은 5글자 이하여야 합니다"/>}
            <br />
            <br />

            <label htmlFor="signupID" className="signupID"> 🍀 아이디 </label>
            <div></div>
            <Inputbox
                name="signupID"
                placeholder="아이디를 입력하세요" 
                id="signupID"
                {...register("signupID",{
                    required:true,
                    maxLength:{value:8}
                })}
            >
            </Inputbox>
            {errors.signupID && errors.signupID.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>}
            {errors.signupID && errors.signupID.type==="maxLength" && 
                <FormError message="⚠ 아이디는 8글자 이하여야 합니다"/>}
            <br />
            <br />

            <label htmlFor="signupPW" className="signupPW"> 🍀 비밀번호 </label>
            <div></div>

            <div>
                <InputGroup> 
                    <Inputbox
                        style={{width:'65%'}} 
                        placeholder="비밀번호를 입력하세요"
                        name="signupPW"
                        id="signupPW"
                        type={inputType}
                           {...register("signupPW",{
                               required:true,
                               maxLength:{value:6}
                        })}
                    />
                    <Button type="button" onClick={eyeClicked}>
                        {renderEyeIcon()}
                    </Button>
                </InputGroup>
                {errors.signupPW && errors.signupPW.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>}
                {errors.signupPW && errors.signupPW.type==="maxLength" &&
                <FormError message="⚠ 비밀번호는 6글자 이하여야 합니다"/>}
            </div>
            <br />            

            <label htmlFor="confirmPW" className="confirmPW"> 🍀 비밀번호 재확인 </label>
            <div></div>
            <Inputbox 
                name="confirmPW"
                placeholder="비밀번호를 다시 입력하세요" 
                id="confirmPW"
                type="password"
                {...register("confirmPW",{
                    required:true,
                    validate: (value)=>((value) === password.current)
                })}
            >
            </Inputbox>
            {errors.confirmPW && errors.confirmPW.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>}
            
            {errors.confirmPW && errors.confirmPW.type==="validate" &&
                <FormError message="⚠ 비밀번호가 일치하지 않습니다"/>}
            <br/>
            <br />


            <label htmlFor="signupGender" className="signupGender"> 🍀 성별 </label>
            <div>
                <Genderselection>
                    <option value="Female">여자</option>
                    <option value="Male">남자</option>
                    <option value="Other">기타</option>
                </Genderselection>
            </div> 
              
            <br />

            <label htmlFor="signupPhone" className="signupPhone"> 🍀 전화번호 </label>
            <div></div>

            <div>

            <Phonebox 
                name="signupPhone"
                placeholder="전화번호를 입력하세요" 
                id="signupPhone"
                type="number"

                // value={phone}
                {...register("signupPhone",{
                    required:true,
                    pattern: /[0-9]/g,
                    // minLength:{value:11}
                    // /[0-9]/g
                })}
            >
            </Phonebox>
            {"\u00a0\u00a0"}
            <PhoneButton type='button' onClick={confirmAlert}>인증번호받기</PhoneButton>
            {errors.signupPhone && errors.signupPhone.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>}
            {/* {errors.signupPhone && errors.signupPhone.type==="minLength" &&
                <FormError message="⚠ 전화번호를 올바르게 입력해주세요"/>} */}
                <div></div>
            <Phonebox 
                name="confirmNum"
                placeholder="인증번호를 입력하세요" 
                id="confirmNum"
                type="number"
                {...register("confirmNum",{
                    required:true,
                    pattern: /[0-9]/g,
                    type:"number"
                })}>
            </Phonebox> 
            {"\u00a0\u00a0"}
            <PhoneButton type='button' onClick={confirmNumOk}>확인</PhoneButton>
            {errors.confirmNum && errors.confirmNum.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>}
            {errors.confirmNum && errors.confirmNum.type==="pattern" &&
                <FormError message="⚠ 숫자만 입력 가능합니다"/>}
            <br />
            </div>
                

            <RegisterBtn type="submit">가입하기</RegisterBtn>
           
            </Contentbox>

         </Wrapper>
         </form>
             <ToastContainer />
      </Container>
    );
}

export default SignUp;

const Container = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 45%;
    left: 50%;

    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 15px;
    margin-top:30px;
    background-color: #FCF9FA;
    width: 600px;
    height: 850px;
`

const Wrapper = styled.div`
    position: relative;
    width: 600px;
    height:700px;

    .signup {
        font-weight:800;
        font-size:35px;
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
    


    .signupName, .signupID, .signupPW, .confirmPW, .signupGender, .signupPhone {
    color:black;
    font-weight:800;
    font-size: 15px;
    margin-bottom:50px;
    border-radius:4px;
    position: relative;
    top:-2px;
    right: 32%;
    }

    .signupName {left:-33%}

    .signupPW {left:-31%}

    .confirmPW {left:-26%}

    .signupGender {left:-33.5%}

    .signupPhone {left:-30%}

    .signupID {left:-32%}

`

const Inputbox = styled.input`
    width:70%;
    height:20px;
    ::placeholder{color:grey;}
    background:#F0F0F0;
    right:40%;
    
    border-radius: 4px;
    border: 1px solid white;
    padding: 8px 30px;
    font-size: 14px;
    max-width: 400px;
    display:inline;
`
const Button= styled.button`
    border-radius: 3px;
    border: 3px solid darkgrey;
    width: 30px;
    height: 35px;

    text-align: center;
    justify-items:center;

    img{
        width:15px;
        height:15px;
    }
`


const RegisterBtn = styled.button`
    width: 50%;
    height: 48px;
    border-radius: 24px;
    background: #F08080;
    color: #fff;
    margin-top: 20px;
    font-size:20px;
    border: 1px solid #BD5E7A;
    &:hover{
        background:#ea657c;
    }
`

const Genderselection = styled.select`
    width: 300px;
    margin:10px;
    height: 32px;
    color:black;
    border: 2px solid black;

    &:focus{
        font-weight:600;
    }
`
const Phonebox = styled.input`
    width:50%;
    height:20px;
    ::placeholder{color:grey;}
    background:#F0F0F0;
    right:40%;
    
    border-radius: 4px;
    border: 1px solid white;
    padding: 8px 30px;
    font-size: 14px;
    max-width: 400px;
    display:inline;
`
const PhoneButton = styled.button`
    color:black;
    width: 20%;
    height: 35px;
    background:#7dde8e;
    border: 1px solid #7dde8e;
    border-radius: 4px;
    &:hover{
        background: #07bc0c;
    }
    font-weight:800;
`

const InputField = styled.div`
  display:inline-block;
  width: 100%;

  label {
    display:block;
    margin-bottom: 7px;
    font-size:12px;
    font-weight:300;
    color:red;

    img {
      width: 13px;
      vertical-align: middle;
      margin-left: 3px;
    }
  }

  span{
    font-weight:600;
    color:black;
  }

  input {
    width:65%;
    height:20px;
    ::placeholder{color:grey;}
    background:#F0F0F0;
    right:30%;
    
    border-radius: 4px;
    border: 1px solid white;
    padding: 8px 30px;
    font-size: 14px;
    max-width: 400px;
    display:inline;
  }
  
  button {
    padding:5px 20px;
    font-weight:600;
    color:white;
    border:none;
    outline: none;
    border-radius: 5px;
    background-color:grey
  }
  & + & {
    margin-top: 15px;
  }
`;