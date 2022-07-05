import styled from "styled-components";

const SFormError = styled.div`
  display:table-cell;
  color:tomato;
  font-weight:300;
  font-size:.8rem;
  padding-left:70px;
`;

function FormError({message}) {
  return message==="" ? null : <SFormError>{message}</SFormError>
}

export default FormError;