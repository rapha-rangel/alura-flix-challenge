import { ChangeEvent } from "react";
import styled from "styled-components";

interface InputTextAreaTypes {
  value: string
  name: string
  card:string
  placeholder: string
  handleChange:(e:ChangeEvent<HTMLTextAreaElement>)=> void
}

interface InputTypes{
  $card: string
}

const InputBox =styled.div<InputTypes>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    width: ${({$card})=> $card==="criar"? "65%": "100%"};
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    width:${({$card})=> $card==="criar"? "50%": "100%"};
    padding-right: ${({$card})=> $card==="criar"? "20px": "none"};
  }

  label {
    color: white;
    font-family: Source Sans Pro;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;
    text-transform: capitalize;
  }
  textarea {
    font-family: Source Sans Pro;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    border:${({$card})=> $card === "criar"? "3px solid var(--background-header)":"3px solid var(--primary-header-color)"};
    border-radius: 10px;
    padding: 15px 12px;
    background: ${({$card})=> $card=== "criar"? "var(--background-main)": "var(--background-modal)"};  
    color: white;
    outline:none;
  }
  textarea:focus:required:invalid{
    border: 2px solid red;
  }
`

export function InputTextArea({name,value, card, handleChange, placeholder}:InputTextAreaTypes ) {
  return (
    <InputBox
      $card={card}>
      <label>{name}</label>
      <textarea
        onChange={handleChange}
        required 
        name={name}
        placeholder={placeholder}
        value={value} rows={5}></textarea>
    </InputBox>
  )
}