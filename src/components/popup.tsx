import { useCard } from "@/hooks/useCard"
import { useModal } from "@/hooks/useModal"
import { exitIcon } from "@/icons/icon"
import { useEffect } from "react"
import {styled,keyframes, css} from "styled-components"

interface PropUpTypes {
  open: boolean
  $backcolor: string
}

const showDisplayAnimation = keyframes`
  0% { top: -10%; display:none }
  100% { top: 0%; display:flex }
`
const showDisplayOffAnimation = keyframes`
  0% {  top: 0%; display:flex; }
  100% { top: -10%; display:none;opacity:0  }
`

const showAnimation = keyframes`
  0% { top: 100%; display:none }
  100% { top: 90%; display:flex }
`
const showOffAnimation = keyframes`
  0% {  top: 90%; display:flex; }
  100% { top: 100%; display:none;opacity:0  }
`

const PopUpTag = styled.div<PropUpTypes>`
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  background-color: ${({$backcolor})=> $backcolor==="verde"? 'var(--successful-color-card)' :'var(--erro-color-card)'};
  position: absolute;
  width: 100%;
  top:0;
  z-index: 1000;
  border-radius: 15px;
  display: ${({open})=> open? "flex": "none"};
  ${({open})=> {
    if(open){
      return css`
        animation:${showDisplayAnimation} 1s linear ;
      `
    }else{
      return css`
      animation:${showDisplayOffAnimation} 0.6s linear ;
      `
    }
  }};
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    top:90%;
    right: 5%;
    width: 300px;
    ${({open})=> {
    if(open){
      return css`
        animation:${showAnimation} 1s linear ;
      `
    }else{
      return css`
      animation:${showOffAnimation} 0.6s linear ;
      `
    }
  }};
  }
` 
const Title = styled.h4`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: white;
`
const IconDiv = styled.div`
  margin-left: 10px;
  font-size: 30px;
  font-weight: 600;
  line-height: 24px;
  color: white;
  cursor: pointer;

`

export function PopUp(){
  const {openPopUp, setOpenPopUp} = useModal();
  const {messageCardSuccessful} = useCard();
  useEffect(()=>{
    setTimeout(()=>{
      setOpenPopUp(false)
    },5000)
  }, [openPopUp])
  return(
    <PopUpTag
      $backcolor={messageCardSuccessful.backgroundColor}
      open={openPopUp}>
      <Title>
        {messageCardSuccessful.text}
      </Title>
      <IconDiv
        onClick={()=>setOpenPopUp(false)}>{exitIcon}</IconDiv>
    </PopUpTag>
  )
}