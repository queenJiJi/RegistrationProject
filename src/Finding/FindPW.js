import React,{useEffect, useState} from "react";
import styled from 'styled-components';
import logo from '../briphylogo.png';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form';
import FormError from "../Components/FormError";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


const FindPW = () =>
{
    const [find,setFind] = useState({}) //이름과 폰번호를 한번에 객체로 저장할 예정

    const phoneRegex=RegExp(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
    );

    const schema = yup.object().shape({
        findID: yup.string()
          .required("⚠ 필수로 입력하셔야 합니다"),
        name: yup.string()
          .required("⚠ 필수로 입력하셔야 합니다"),
        phone: yup.string()
          .required("⚠ 필수로 입력하셔야 합니다")
          .matches(phoneRegex, "⚠ 전화번호 양식에 맞지않습니다")
    });

    const {register,formState:{errors},handleSubmit} = useForm(
        {resolver: yupResolver(schema)}
    );
    const savedInfo= JSON.parse(localStorage.getItem('user'));
    
    useEffect(()=>{
        if(!isObjEmpty(find)){
        getFind();}
    },[find]); //find객체(name,phone)에 변화가 생길 때마다 감지하고 getFind()불러오기

    //check if the object is empty
    const isObjEmpty = obj => {
    if (obj === undefined || obj === null) return true
    else return Object.keys(obj).length === 0
    }


    //localStorage에 저장+Find객체 set
    const saveFind=(data)=>{
        if(!isObjEmpty(data)){
            localStorage.setItem("findPW",JSON.stringify(data));
            setFind(data);
            // console.log("data is : ", data);
            // console.log("find is : ", find)
        }
    }

    //버튼 클릭시(= form이 submit이 될때) safeFind 호출
    const clickHandler=(val)=>{
        if(isObjEmpty(errors)){ //error가 없을 때
            // console.log("error not exsits")
            const elem = { //넘어온 데이터(val)을 이렇게 객체로 저장해줄 것이라고 선언
                findID  : val.findID,
                name : val.name,
                phone: val.phone
            }
            saveFind(elem);
            // console.log(val);
            // console.log(elem.findID)
            //getFind() -> 함수에서 벗어나지 않으면 saveFind의 변경사항이 아직 적용되지않아서 사용할수없음
        }
       
    }  

    //popup창 뜨게 하는 것
    const getFind=()=>
    {   
        if(!isObjEmpty(savedInfo))
        {
            if(find.findID===savedInfo.id && find.name===savedInfo.name && find.phone === savedInfo.phone)
            {
                const id=toast("", {autoClose:0.3})
                toast.update(id,{ render: `회원가입시 사용한 비밀번호는 : < ${savedInfo.pw} > 입니다` ,type:"success" },
                {
                    autoClose:3000,
                    closeOnClick:true,
                    pauseOnHover:true,
                    draggable:true,
                });
            }
       
            else{
                // Popup.alert("Sorry, We couldn't find your ID!!")
                toast.error("해다 비밀번호를 찾을 수 없습니다",
                {
                    autoClose:1000,
                    closeOnClick:true,
                    pauseOnHover:true,
                    draggable:true,
                });
            }
        }
        else{ alert("등록된 회원정보가 없습니다.\n회원가입을 해주시기 바랍니다");};
    }


    return(
        <Container>
           
        <form onSubmit={handleSubmit(clickHandler)} >
         <Wrapper>
            <div className="briphy"></div>

            <Contentbox>

            <label htmlFor="findID" className="findID"> 🍀 아이디 </label>
            <div></div>
            <Inputbox
                name="findID"
                placeholder="아이디를 입력하세요" 
                id="findID"
                {...register("findID",
                // {
                //     required:true,
                // }
                )}
            >
            </Inputbox>
            {<FormError message={errors.findID?.message} />}
            {/* {errors.findID && errors.findID.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>} */}
            <br />

            <label htmlFor="findName" className="findName"> 🍀 이름 </label>
            <div></div>
            <Inputbox
                name="name"
                placeholder="이름을 입력하세요" 
                id="findName"
                {...register("name",
                // {
                //     required:true,
                // }
                )}
            >
            </Inputbox>
            {<FormError message={errors.name?.message} />}
            {/* {errors.name && errors.name.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>} */}
            <br />
            
            <label htmlFor="findPhone" className="findPhone"> 🍀 전화번호 </label>
            <div></div>
            <Inputbox 
                name="phone"
                placeholder="전화번호를 입력하세요" 
                id="findPhone"
                {...register("phone",
                // {
                //     required:true,
                //     pattern: /[0-9]/g,
                //     maxLength:{value:11}
                // }
                )}
            >
            </Inputbox>
            {<FormError message={errors.phone?.message} />}
            {/* {errors.phone && errors.phone.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>}
            
            {errors.phone && errors.phone.type==="pattern" &&
                <FormError message="⚠ 숫자만 입력 가능합니다"/>}

            {errors.phone && errors.phone.type==="maxLength" &&
                <FormError message="⚠ 전화번호 양식에 맞지않습니다"/>} */}
           
            <br/>
            <Button type="submit">찾 기</Button>
            {/* <Popup /> */}
            <div style={{textAlign:"right", 
                        marginTop:"15px",}}>
                <a href="/" style={{fontSize:"13px"}}>로그인하기</a>
            </div>
            </Contentbox>
         </Wrapper>
         </form>
             <ToastContainer />
        </Container>
    );
}

export default FindPW;

const Container = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 15px;
    margin-top:90px;
    background-color: #FCF9FA;
    width: 500px;
    height: 595px;

`


const Wrapper = styled.div`
    position: relative;
    width: 500px;
    height:500px;

    .briphy {
        background-image:url(${logo});
        background-repeat:no-repeat;
        background-position:center;
        background-size:110px;
        height:150px;
        position:relative;
        top:2%;
    }

    
    }
`

const Contentbox = styled.div`
    height: 300px;
    margin-top:20px;
    text-align:center;
    padding: 17px 30px;
    
    .findID,.findName, .findPhone {
    color:black;
    font-weight:800;
    font-size: 15px;
    margin-bottom:50px;
    border-radius:4px;
    position: relative;
    top:-2px;
    right: 32%;
    }

    .findID{ left:-28%}
    .findName{ left:-30%}
    .findPhone{ left:-27%}

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

const Button = styled.button`
    width: 50%;
    height: 48px;
    border-radius: 24px;
    background: #F08080;
    color: #fff;
    margin-top:0px;
    font-size:23px;
    border: 1px solid #BD5E7A;
    &:hover{
        background:#BD5E7A;
    }
    font-family:"Jua";
`
