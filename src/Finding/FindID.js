import React,{useEffect, useState} from "react";
import styled from 'styled-components';
import logo from '../briphylogo.png';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form';
import FormError from "../Components/FormError";


const FindID = () =>
{
    // const [name,setName] = useState("");
    // const [phone,setPhone] = useState("");
    const [find,setFind] = useState({}) //이름과 폰번호를 한번에 객체로 저장할 예정
    const {register,formState:{errors},handleSubmit} = useForm();
    
    useEffect(()=>{
        if(!isObjEmpty(find)){
        getFind();}
    },[find]); //find객체(name,phone)에 변화가 생길 때마다 감지하고 getFind()불러오기

    //check if the object is empty
    const isObjEmpty = obj => {
    if (obj === undefined || obj === null) return true
    else return Object.keys(obj).length === 0
    }

    // const nameHandler=(e)=>
    // {
    //     setName(e.target.value);
    // }

    // const phoneHandler=(e)=>
    // {
    //     setPhone(e.target.value);
    // }

    //localStorage에 저장+Find객체 set
    const saveFind=(data)=>{
        if(!isObjEmpty(data)){
            localStorage.setItem("find",JSON.stringify(data));
            setFind(data);
        }
    }

    //버튼 클릭시(= form이 submit이 될때) safeFind 호출
    const clickHandler=(val)=>{
        if(isObjEmpty(errors)){ //error가 없을 때
            // console.log("error not exsits")
            const elem = { //넘어온 데이터(val)을 이렇게 객체로 저장해줄 것이라고 선언
                name : val.name,
                phone: val.phone
            }
            saveFind(elem);
            //getFind() -> 함수에서 벗어나지 않으면 saveFind의 변경사항이 아직 적용되지않아서 사용할수없음
        }
       
    }  

    //popup창 뜨게 하는 것
    const getFind=()=>
    {
        if(find.name===("박지지"))
        {
            const id=toast("", {autoClose:0.3})
            toast.update(id,{ render: `회원가입시 사용한 아이디는 : < ${find.name} > 입니다` ,type:"success" },
            {
                autoClose:5000,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
            });
        }
   
        else{
            // Popup.alert("Sorry, We couldn't find your ID!!")
            toast.error("해당 아이디를 찾을 수 없습니다",
            {
                autoClose:1000,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
            });
        }
    }


    return(
        <Container>
           
        <form onSubmit={handleSubmit(clickHandler)} >
         <Wrapper>
            <div className="briphy"></div>

            <Contentbox>

            <label htmlFor="findName" className="findName"> 🍀 이름 </label>
            <div></div>
            <Inputbox
                name="name"
                placeholder="이름을 입력하세요" 
                id="findName"
                // value={name}
                // onChange={nameHandler}
                {...register("name",{
                    required:true,
                })}
            >
            </Inputbox>
            {errors.name && errors.name.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>}
            <br />
            
            <br />
            <label htmlFor="findPhone" className="findPhone"> 🍀 전화번호 </label>
            <div></div>
            <Inputbox 
                name="phone"
                placeholder="전화번호를 입력하세요" 
                id="findPhone"
                // type="number"
                // value={phone}
                // onChange={phoneHandler}
                {...register("phone",{
                    required:true,
                    pattern: /[0-9]/g
                })}
            >
            </Inputbox>
            {errors.phone && errors.phone.type==="required" && 
                <FormError message="⚠ 필수로 입력하셔야 합니다"/>}
            
            {errors.phone && errors.phone.type==="pattern" &&
                <FormError message="⚠ 숫자만 입력 가능합니다"/>}
           
            <br/>
            <br />
            <Button type="submit">찾 기</Button>
            {/* <Popup /> */}
            </Contentbox>

         </Wrapper>
         </form>
             <ToastContainer />
        </Container>
    );
}

export default FindID;

const Container = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;

    // right: 120%;
    transform: translate(-50%,-50%);
    background: #fff;
    // padding: 80px 300px;    
    border-radius: 15px;
    margin-top:30px;
    background-color: #FCF9FA;
    width: 500px;
    height: 500px;


`
// const BackLogo = styled.img.attrs({src: `${logo}`}) `
//     width:100px;
//     height:100px;
//     background-size:contain;
// `

// const BackLogo = styled.div`
//     background-image:url(${logo});
//     width:500px;
//     height:500px;
//     border: 1px solid #000;
// `


const Wrapper = styled.div`
    position: relative;
    // right: 70%;
    // left:33%;
    // margin: 10% ;
    // bottom: -60px;
    width: 500px;
    height:500px;
    // display: grid;
    // grid-template-columns: .2fr .7fr;

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
    // margin-left:18px;
    text-align:center;
    padding: 17px 30px;
    


    .findName, .findPhone {
    color:black;
    // position:relative;
    // top:0px;
    // left:10px;
    font-weight:800;
    font-size: 15px;
    // text-align: left;
    margin-bottom:50px;
    border-radius:4px;
    position: relative;
    top:-2px;
    right: 32%;
    }

    .findName{
        right:35%
    }

`

const Inputbox = styled.input`
    width:70%;
    height:20px;
    // border: 2px solid grey;
    // border-radius: 4px;
    ::placeholder{color:grey;}
    // justify-content:center;
    // position:relative;
    background:#F0F0F0;
    right:40%;
    
    border-radius: 4px;
    border: 1px solid white;
    padding: 8px 30px;
    // margin-bottom: 10px;
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
    margin-top: 20px;
    // margin-left: 25%;
    font-size:20px;
    border: 1px solid #BD5E7A;
    // position:relative;
    // right:210%;
    &:hover{
        background:#BD5E7A;
    }
`
