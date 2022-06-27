import styled from "styled-components";

const SFormError = styled.div`
  display:inline-block;
  color:tomato;
  font-weight:300;
  font-size:.8rem;
  // margin-bottom:15px;
  position:relative;
  right:20%

`;

function FormError({message}) {
  return message==="" ? null : <SFormError>{message}</SFormError>
}

export default FormError;