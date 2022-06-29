import React, {useState} from 'react'
import FindID from './FindID';
import FindPW from './FindPW';
import styled from 'styled-components';

function Find() {

  const [idOn, setIdOn] = useState(false); //idOn === true === id찾기 
                                           //idOn === false === pw찾기
  const [clickVal, setClickVal] = useState();

  const clickHandler = (event) => 
  {
    setIdOn(idOn=>!idOn);

    if(event.currentTarget.id === "idBtn") 
    { setClickVal('ID');}
    if(event.currentTarget.id === "pwBtn") 
    { setClickVal("PW");}
  };

  return (
      <div>
            <Button 
                className={idOn? "active" : null} 
                onClick={clickHandler} 
                id="idBtn"
            >
                <p>아이디 찾기</p>
            </Button>

            <Button
                className={idOn? null : "active"}
                onClick={clickHandler}
                id="pwBtn"
            >
                 <p>비밀번호 찾기</p>
            </Button>

            {/* {clickVal === 'ID' ? <FindID /> : ''}
            {clickVal === 'PW' ? <FindPW /> : ''} 
                위 두개랑 아래 한 줄이랑 같음
            */}

            <FindID />
            {clickVal === 'ID' ? <FindID /> : (clickVal === 'PW' ? <FindPW/> : '')}

            
      </div>
 );
}

const Button = styled.button`
    background:white;
    width: 50%;
    text-align:center;
    justify-content:cetner;
    margin-top:30px;

    p{
       font-size:15px;
       font-weight:800;
    }

    &:hover{
        background:#F08080;
        color:white;
    }
`

export default Find;