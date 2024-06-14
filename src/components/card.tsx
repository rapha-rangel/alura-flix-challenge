import {styled, css} from 'styled-components';
import { CardsTypes} from '../types/cards-types';
import { penIcon, trashIcon } from '@/icons/icon';
import { useModal } from '../hooks/useModal';
import { useCard } from '@/hooks/useCard';

interface ImagemButtonsTypes {
  $categoria: string
}

const CardTag = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`
const ImageBox = styled.div<ImagemButtonsTypes>`
  position: relative;
  width: 373px;
  height: 260.85px;
    div {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      border-radius: 4px 4px 0px 0px;
      ${(props)=>{
      switch (props.$categoria) {
      case "front end":
        return css`
          box-shadow: 0px 0px 17px 8px var(--cards-frontend-color) inset;
        `;
      case "back end":
        return css`
          box-shadow: 0px 0px 17px 8px var(--cards-backend-color) inset;
        `;
      default:
        return css`
          box-shadow: 0px 0px 17px 8px var(--cards-mobile-color) inset;
        `;
      }}}
    }
    img {
      width: 100%;
      height: 100%;
      ${(props)=>{
      switch (props.$categoria) {
      case "front end":
        return css`
          border: 4px solid var(--cards-frontend-color);
        `;
      case "back end":
        return css`
          border: 4px solid var(--cards-backend-color);
        `;
      default:
        return css`
          border: 4px solid var(--cards-mobile-color);
        `;
      }}}
    }
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    width: 432px;
  }
`

const ButtonsTag= styled.div<ImagemButtonsTypes>`
  display: flex;
  gap: 70px;
  align-items: center;
  justify-content: center;
  padding: 15px 0px;
  background: #000000E5;
  border-radius: 0px 0px 15px 15px;
  ${(props)=>{
      switch (props.$categoria) {
      case "front end":
        return css`
          box-shadow: 0px -4px 5px 3px var(--cards-frontend-color) inset;
          border: 0px 5px 5px 5px solid var(--cards-frontend-color);
          background-color: ;
        `;
      case "back end":
        return css`
          box-shadow: 0px -4px 5px 3px var(--cards-backend-color) inset;
          border: 0px 5px 5px 5px solid var(--cards-backend-color);

        `;
      default:
        return css`
          box-shadow: 0px -4px 5px 3px var(--cards-mobile-color) inset;
          border: 0px 5px 5px 5px solid var(--cards-mobile-color);
        `;
    }}}

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap:20px;
    padding-bottom: 5px;
    cursor: pointer;
    p {
      font-family: inherit;
      font-size: 16px;
      font-weight: 800;
      line-height: 18.75px;
      text-align: left;
      text-transform: uppercase;
    }
  }
`
const IconTag = styled.div`
  font-size: 28px;
`

export function Card({imagem, id, categoria, titulo, video, descricao}:CardsTypes){
  const {openModal, setOpenModal,openModalDialog, setOpenModalDialog} =useModal();
  const {setChoisedCard} = useCard();
  
  const handleCardDelete = ()=>{
    console.log("delete")
    if(openModalDialog||openModal){
    }else{
      setOpenModalDialog(true);
      setChoisedCard({id, imagem, categoria, titulo, video, descricao});
    }
  }

  const handleCardModal = ()=>{
    if(openModal||openModalDialog){
    }else{
      setChoisedCard({id, imagem, categoria, titulo, video, descricao});
      setOpenModal(true);
    }
  }
  return (
    <CardTag>
      <ImageBox $categoria={categoria||""}>
        <div></div>
        <img src={imagem} alt={titulo}/>
      </ImageBox>
      <ButtonsTag 
        $categoria={categoria||""}>
        <div
          onClick={handleCardDelete}><IconTag>{trashIcon}</IconTag><p>deletar</p></div>
        <div
          onClick={handleCardModal}><IconTag>{penIcon}</IconTag><p>editar</p></div>
      </ButtonsTag>
    </CardTag>
  )
}