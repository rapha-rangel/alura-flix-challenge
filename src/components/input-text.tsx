import { ChangeEvent, ChangeEventHandler } from "react";
import styled from "styled-components";

interface InputTextTypes {
  value: string
  name: string
  card: string
  placeholder: string
  handleChange:(e:ChangeEvent<HTMLInputElement>)=> void
}

interface InputTypes{
  $card: string
}

const InputBox =styled.div<InputTypes>`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    width:${({$card})=> $card==="criar"? "50%": "100%"};
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    width:${({$card})=> $card==="criar"? "50%": "100%"};
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
  input {
    display: block;
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    
  }
  input:focus:required:invalid{
    border: 2px solid red;
  }
`

export function InputText({name,value,card, placeholder, handleChange}:InputTextTypes ) {

  return (
    <InputBox
      $card={card}>
      <label>{name}</label>
      <input type='text'
        onChange={handleChange}
        name={name}
        value={value}
        placeholder={placeholder}
        required
      />
    </InputBox>
  )
}