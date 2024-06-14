import {styled, keyframes, css} from "styled-components";
import { useModal } from "../hooks/useModal";
import { Buttons } from "./button";
import { useCard } from "@/hooks/useCard";
import axios from "axios";


interface EditarModal {
  $show: boolean
}

const $showDisplayAnimation = keyframes`
  0% { display:none; opacity: 0; bottom:-20%; }
  100% {display:flex;opacity: 1; bottom:0%;}
`
const $showDisplayOffAnimation = keyframes`
  0% { display:flex;opacity: 1; bottom:0%;}
  100% { display:none;opacity: 0; bottom:-20%;}
`
const $showAnimation = keyframes`
  0% { display:none; opacity: 0; bottom:100%; }
  100% {display:flex;opacity: 1; bottom:25%;}
`
const $showOffAnimation = keyframes`
  0% { display:flex;opacity: 1; bottom:25%;}
  100% { display:none;opacity: 0; bottom:100%;}
`
const ModalTag = styled.div<EditarModal>`
  border: 5px solid var(--cards-frontend-color);
  background: var(--background-modal);
  color: white;
  position: fixed;
  border-radius: 15px;
  padding:10px 5px;
  bottom: 0%;
  left:50%;
  transform: translate(-50%);
  z-index: 100;
  flex-direction: column;
  display: ${({$show})=> $show? "flex": "none"};
  min-width:374px;
  width: 95%;
  padding: 20px;
  gap: 50px;
  ${({$show})=> {
    if($show){
      return css`
        animation:${$showDisplayAnimation} 1s linear ;
      `
    }else{
      return css`
      animation:${$showDisplayOffAnimation} 0.6s linear ;
      `
    }}};
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    justify-content: center;
    padding:30px 100px;
    max-width:865px;
    width:95%;
    gap: 50px;
    bottom:25%;
    transform: translate(-50%,-50%);
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
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    padding:30px 100px;
    max-width:974px;
    width: 100%;
    gap: 50px;
  }
`
const Titulo = styled.h4`
  font-family: inherit;
  font-size:25px;
  font-weight:900;
  line-height:37.5px;
  text-align:center;
`
const SubTitulo = styled.h3`
  font-family: inherit;
  font-size:32px;
  font-weight:900;
  line-height:37.5px;
  text-align:center;
`

const ButtonsTag = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    padding:0px 50px;
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    padding:0px 100px;    
  }
`
export function DeleteCardModal() { 
  const {openModalDialog, setOpenModalDialog, setOpenPopUp} = useModal();
  const {choisedCard,updateCards, setUpdateCards, setMessageCardSuccessful} = useCard();
  const handleDelete = async()=>{
    try {
      const response = await axios.delete(`http://localhost:3000/catalogo/${choisedCard.id}`);
      if(response.status ===200){
        setUpdateCards(!updateCards);
        setOpenModalDialog(false)
      } else {
        setOpenPopUp(true);
        setMessageCardSuccessful({
          text: "Card naõ conseguiu ser Deletado",
          backgroundColor: "vermelho"
        })
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleBack =()=>{
    setOpenModalDialog(false)
  }

  return(
    <ModalTag 
      $show={openModalDialog}>
        <div>
          <Titulo>Você tem certeza que quer deletar o card do titulo: </Titulo>
          <SubTitulo>{choisedCard.titulo}</SubTitulo>
        </div>
        <ButtonsTag>
          <Buttons
            handleAction={handleDelete}
            card={"delete"}
            type={"button"}
            selected={false}
            footerborder={false}>
              Deletar
          </Buttons>
          <Buttons
            handleAction={handleBack}
            card={"noDelete"}
            type={"button"}
            selected={false}
            footerborder={false}>
              Voltar
          </Buttons>
        </ButtonsTag >
    </ModalTag>
  )
}