import {Fragment, useState,forwardRef} from 'react'
import PropTypes from 'prop-types'
import {Eye,EyeOff} from 'react-feather'
import {InputGroup, Input, InputGroupText, Label} from 'reactstrap'

const TogglePW= forwardRef((props,ref) => 
{
  const {
    label, hideIcon,showIcon,visible,htmlFor,className,placeholder,iconSize,inputClassName,invalid, ...rest
  } = props
  
  const [inputVisibility,setInputVisibility] = useState(visible)

  //reder Icon Based on Visibility
  const renderIcon=()=>
  {
    const size=iconSize? iconSize:14
    console.log("this is working")
    if(inputVisibility===false)
    {
      return hideIcon? hideIcon : <Eye size={size} />
    }
    else{
      return showIcon? showIcon : <EyeOff size={size} />
    }
  }

  return (
    <Fragment>
      {label? (<Label className='form-label' for={htmlFor}>{label}</Label>): null}
      <InputGroup>
        <Input
          ref={ref}
          invalid={invalid}
          type={inputVisibility===false? 'password' : 'text'}
          placeholder='비밀번호를 입력하세요'
        />
        <InputGroupText className='cursor-pointer' onClick={() => setInputVisibility(!inputVisibility)}>
          {/* <div>{renderIcon()}</div> */}
          {renderIcon()}
        </InputGroupText>
      </InputGroup>
    </Fragment>
  )
})

export default TogglePW;

//Define PropTypes
 TogglePW.propTypes={
  hideIcon:PropTypes.node,
  showIcon:PropTypes.node,
  visible:PropTypes.bool,
  className:PropTypes.string,
  placeholder:PropTypes.string,
  iconSize:PropTypes.number,
  inputClassName:PropTypes.string,
  invalid: PropTypes.bool,
  label(props,propName){
      // ** If label is defined and htmlFor is undefined throw error
    if(props[propName]&&props['htmlFor']==='undefined'){
        throw new Error('htmlFor prop is required when label prop is present')
    }},
  htmlFor(props, propName)
  {
   // ** If htmlFor is defined and label is undefined throw error
    if (props[propName] && props['label'] === 'undefined') {
      throw new Error('label prop is required when htmlFor prop is present')
    }
  }
 }

 // Defulat Props
 TogglePW.defaultProps={
    visible:false}

