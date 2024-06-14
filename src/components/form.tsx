import {styled, css} from "styled-components";
import { InputText } from "./input-text";
import { InputSelect } from "./input-select";
import { InputTextArea } from "./input-textarea";
import { Buttons } from "./button";
import { PageTypes } from "@/types/page-types";
import { useModal } from "@/hooks/useModal";
import { useCard } from "@/hooks/useCard";
import axios from "axios";
import { ChangeEvent, useState } from "react";

interface FormProps {
  card: string
  title: string
}

interface FormTituloButtonsTypes {
  $card: string
}

const FormTag = styled.form<FormTituloButtonsTypes>`
  display: flex;
  flex-direction: column;
  ${({$card})=>{
    if($card ==="edit"){
      return css`
      margin:0px 10px;
        @media (min-width: ${props=> props.theme.tabletBreakpoint}){
          margin:0px 100px;
        }
        @media (min-width: ${props=> props.theme.laptopBreakpoint}){
          margin: 0px 200px;
        }
      `
    }else{
      return css`
        gap:40px;
        margin:0px 50px 50px 50px;
        @media (min-width: ${props=> props.theme.tabletBreakpoint}){
          margin:0px 20px 0px 50px;
        }
        @media (min-width: ${props=> props.theme.laptopBreakpoint}){
          margin: 0px 130px;
        }
      `
    }
  }}
  
`
const TituloModal = styled.h3<FormTituloButtonsTypes>`
  font-family: inherit;
  border-radius: 4px;
  text-transform: uppercase;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    font-size: 60px;
    line-height: 70.31px;
    text-align: left;
  }
  ${({$card})=>{
    if($card ==="edit"){
      return css`
        font-size:32px;
        font-weight:900;
        line-height:37.5px;
        text-align:center;
        margin-bottom: 30px;
        color:var(--primary-header-color);
      `
    } else{
      return css`
        border-top: 3px solid var(--background-header);
        border-bottom: 3px solid var(--background-header);
        font-size:36px;
        font-weight:600;
        line-height:24px;
        text-align:left;
        color:white;
        padding:30px 0px;
        @media (min-width: ${props=> props.theme.tabletBreakpoint}){
          font-size: 60px;
          line-height: 70.31px;
          text-align: left;
          margin-right: 50px;
        }
      `
  }}};
`
const ButtonsBox = styled.div<FormTituloButtonsTypes>`
  display: flex;
  flex-direction: column;
  gap:20px;
  align-items: center;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    align-items: center;
    gap: 30px;
    flex-direction: row;
  }
  ${({$card})=>{
    if($card==="edit"){
      return css`
        margin-top: 50px;
        @media (min-width: ${props=> props.theme.tabletBreakpoint}){
          justify-content:space-between;
        }
        @media (min-width: ${props=> props.theme.laptopBreakpoint}){
          justify-content:space-between;
        }
      `
    } else {
      return css`
        @media (min-width: ${props=> props.theme.tabletBreakpoint}){
          justify-content:flex-start ;
        }
        @media (min-width: ${props=> props.theme.laptopBreakpoint}){
          justify-content:flex-start;
        }
      `
    }
  }}
`
const LinesInput = styled.div<FormTituloButtonsTypes>`
  display: flex;
  flex-direction: column;
  gap:50px;
  width: 100%;
  ${({$card})=>{
    if($card ==="edit"){
      return css`
        margin-bottom: 50px;
        @media (min-width: ${props=> props.theme.tabletBreakpoint}){
          flex-direction: column;
          gap:40px;
          margin-bottom: 40px;
        }
        @media (min-width: ${props=> props.theme.laptopBreakpoint}){
          flex-direction: column;
          gap:50px;
          margin-bottom: 50px;
        }
      `
    } else{
      return css`
        @media (min-width: ${props=> props.theme.tabletBreakpoint}){
          flex-direction: row;
          gap:20px;
        }
        @media (min-width: ${props=> props.theme.laptopBreakpoint}){
          flex-direction: row;
          gap:50px;
        }
      `
  }}};
`

export function Form ({card, title}: FormProps){
  const {pagePriority, setOpenModal, setOpenPopUp} = useModal();
  const {choisedCard, setChoisedCard, categories, setUpdateCards, updateCards, 
    setMessageCardSuccessful, handleClear} = useCard();
  const [borderSelect, setBorderSelect] = useState(false);

  const handleChange=(e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>)=>{
    const name = e.target.name;
    const value = e.target.value;
    setChoisedCard({...choisedCard,[name]:value});
  };

  const handleSelect=(option: string)=>{
    setChoisedCard({...choisedCard, categoria:option});
    setBorderSelect(false)
  };

  const handleSubmitEdit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try{
      if(choisedCard.categoria ==="") {
        setBorderSelect(true);
      }else{
        const response = await axios.put(`http://localhost:3000/catalogo/${choisedCard.id}`, choisedCard);
        setUpdateCards(!updateCards);
        setOpenModal(false);
      }
    } catch (err){
      console.log(err);
    }
  };

  const handleSubmitCriar = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(choisedCard)
    try{
      if(choisedCard.categoria ==="") {
        setBorderSelect(true);
      }else{
        const response = await axios.post(`http://localhost:3000/catalogo`, choisedCard);
        setOpenPopUp(true);
        if(response.status === 201){
          setUpdateCards(!updateCards);
          handleClear();
          setMessageCardSuccessful({
            text: "Card Criado com Sucesso",
            backgroundColor:"verde"
          });
        } else {
          setMessageCardSuccessful({
            text: "Erro ao Criar Card",
            backgroundColor:"vermelho"
          });
        }
      }
    } catch(err){
      console.log(err);
    }
  };

  return(
    <FormTag
      $card={card}
      onSubmit={card==="edit"?handleSubmitEdit: handleSubmitCriar}>
        <TituloModal
          $card={card}>
            {title}
        </TituloModal>
        <LinesInput
          $card={card}>
          <InputText
            card={card}
            name={"titulo"}
            placeholder={card ==="edit" ?choisedCard.titulo: "titulo do video"}
            value={choisedCard.titulo ||""}
            handleChange={handleChange}
          />
          <InputSelect
            borderSelect={borderSelect}
            card={card}
            name={"categoria"}
            placeholder={card ==="edit" ?choisedCard.categoria||"": "escolha uma categoria"}
            options={categories}
            handleChange={handleSelect}
          />
        </LinesInput>
        <LinesInput
          $card={card}>
          <InputText
            card={card}
            name={"imagem"}
            placeholder={card ==="edit" ?choisedCard.imagem||"":"link da imagem"}
            value={choisedCard.imagem ||""}
            handleChange={handleChange}
          />
          <InputText
            card={card}
            name={"video"}
            placeholder={card ==="edit" ?choisedCard.video||"":"link do video"}
            value={choisedCard.video ||""}
            handleChange={handleChange}
          />
        </LinesInput>
        <InputTextArea
          handleChange={handleChange}
          card={card}
          name={"descricao"}
          value={choisedCard.descricao||""}
          placeholder={card ==="edit" ?choisedCard.descricao||"":"descrição do video"}
        />
        <ButtonsBox
          $card={card}>
          <Buttons
            handleAction={()=>{}}
            type={"submit"}
            card={card}
            selected={pagePriority===PageTypes.EDIT}
            footerborder={false}>guardar</Buttons>
          <Buttons
            handleAction={handleClear}
            type={"button"}
            card={card}
            selected={pagePriority===PageTypes.CREATE}
            footerborder={false}>limpar</Buttons>
        </ButtonsBox>
      </FormTag>
  )
}