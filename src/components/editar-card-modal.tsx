import {styled, keyframes, css} from "styled-components";
import { exitIcon } from "@/icons/icon";
import { Form } from "./form";
import { useModal } from "../hooks/useModal";

interface EditarModal {
  $show: boolean
}
const $showAnimation = keyframes`
  0% { height: 0%; display:none }
  100% { height: 100%; display:flex }
`
const $showOffAnimation = keyframes`
  0% {  height: 100%; display:flex;opacity:1 }
  10% {  height: 90%; display:flex;opacity:0.6 }
  90% { height: 0%; opacity:0.3; display:none  }
  100% { height: 0%; display:none;opacity:0  }
`
const ModalTag = styled.div<EditarModal>`
  border: 5px solid #6BD1FF;
  background: var(--background-modal);
  color: white;
  position: fixed;
  border-radius: 15px;
  padding:10px 5px;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  flex-direction: column;
  overflow-y: scroll;
  height: 100vh;
  display: ${({$show})=> $show? "flex": "none"};
  min-width:374px;
  width: 95%;
  ${({$show})=> {
    if($show){
      return css`
        animation:${$showAnimation} 1s linear ;
      `
    }else{
      return css`
      animation:${$showOffAnimation} 0.6s linear ;
      `
    }}};
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    padding:30px 0px;
    max-width:865px;
    width:95%;
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    padding:30px 0px;
    max-width:974px;
    width: 100%;
  }
`
const IconTag = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 43px;
  color: white;
  cursor: pointer;
  margin-right: 10px;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    margin-right: 30px;
  }
`

export function EditarCardModal() {
  const {openModal, setOpenModal} = useModal();
  const handleCloseModal =()=>{
    setOpenModal(false);

  };
  return(
    <ModalTag 
      $show={openModal}>
      <IconTag onClick={handleCloseModal}>{exitIcon}</IconTag>
      <Form
        card={"edit"}
        title={"editar video:"}/>
    </ModalTag>
  )
}