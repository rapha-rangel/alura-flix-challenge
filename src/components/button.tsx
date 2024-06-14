import {styled, css} from "styled-components";
import {MouseEventHandler, ReactNode} from "react";
import { useModal } from "@/hooks/useModal";

interface ButtonTypes {
  selected: boolean
  $footerborder: boolean
  $card: string
}
interface ButtonProps {
  children: ReactNode
  selected: boolean
  footerborder: boolean
  card:string
  type: "button" | "submit" 
  handleAction: MouseEventHandler<HTMLButtonElement> 
}
const ButtonsTag = styled.button<ButtonTypes>`
  width:180px;
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  font-family: inherit;
  text-align: center;
  border:2px solid #F5F5F5;
  color:#ffffff;
  cursor: pointer;
  &:hover{
    border:2px solid var(--primary-header-color);
    box-shadow:0px 0px 12px 4px var(--primary-header-color) inset;
    color:var(--primary-header-color);
  }
  ${(props)=>{
    if(!props.selected && props.$card==="header"){
      return css`
        border:none;
        background-color: var(--background-header);
        &:hover{
          border: none;
          box-shadow: none;
        }
        p:first-of-type {
        display: none;
          @media (min-width:${props=> props.theme.tabletBreakpoint}){
            display: initial;
            background-color: var(--background-header);
          }
        }
        @media (min-width: ${props=> props.theme.tabletBreakpoint}){
          border:2px solid #F5F5F5;
          box-shadow:none;
          color:#ffffff;
          border-radius: 10px;
          padding: 15px 0px;
          display: block;
          background-color: var(--background-header);
          &:hover{
            border:2px solid var(--primary-header-color);
            box-shadow:0px 0px 12px 4px var(--primary-header-color) inset;
            color:var(--primary-header-color);
          }
        }
      `
    } else if(props.selected && props.$card==="header") {
      return css`
        background-color: var(--background-header);
        &:hover{
          border:2px solid var(--primary-header-color);
          box-shadow:0px 0px 12px 4px var(--primary-header-color) inset;
          color:var(--primary-header-color);
          div{
            color:var(--primary-header-color);
          }
        }
        
      `
    }
  }}
  ${(props)=> {
    if(props.$card=== "criar"){
      return css`
        background-color: var(--background-main);
        &:hover {
          border: 2px solid red;
          box-shadow: none;
          color: white;
        }
      `
    }  else if(props.$card=== "edit"){
      return css`
        background-color: var(--background-modal);
        &:hover {
          background-color: black;
        }
      `
  }else if(props.$card=== "delete"){
      return css`
        background-color: var(--background-modal);
        &:hover {
          background-color: black;
          box-shadow: 0px 0px 12px 4px var(--erro-color-card) inset;
          color: var(--erro-color-card);
          border: 2px solid red;
        }
      `
  }else if(props.$card=== "noDelete"){
      return css`
        background-color: var(--background-modal);
        &:hover {
          background-color: black;
          box-shadow: 0px 0px 12px 4px var(--caution-button-color) inset;
          color: var( --caution-button-color);
          border: 2px solid yellow;
        }
      `
  }}};  
  border-radius: ${props=> props.$footerborder?"50px": "10px"};
  padding: 10px 0px;
  align-items:center;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  gap:15px;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    border-radius: 10px;
    padding: 15px 0px;
  }
`

export function Buttons({children, selected, footerborder, card, type, handleAction}: ButtonProps) {
  const { openModal,openModalDialog } = useModal();

  return (
    <ButtonsTag 
      type={type}
      $card={card}
      disabled={(openModal||openModalDialog) && card==="header"? true: false}
      selected={selected}
      $footerborder={footerborder}
      onClick={handleAction}
      >
        {children}
    </ButtonsTag>
  )
}