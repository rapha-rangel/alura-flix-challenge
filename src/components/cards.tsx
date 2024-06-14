"use client"

import axios from "axios";
import { useEffect,useState } from "react";
import {styled,css} from "styled-components";
import { Card } from "./card";
import { CardsTypes} from '../types/cards-types';
import { useModal } from "@/hooks/useModal";
import { useCard } from "@/hooks/useCard";

interface CardTagTypes{
  $categoria: string
}
interface CardsSectionTypes{
  $open: boolean
}
const CardsSection= styled.div<CardsSectionTypes>`
  padding:0px 20px;
  color: white;
  display: flex;
  gap:53px;
  flex-direction: column;
  margin-bottom: 90px;
  filter: ${props=> props.$open? "blur(5px)": "blur(0)"};

  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    padding:0px 57px;
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    padding:0px 42px;
  }
`
const CardsTag = styled.div`
  display: flex;
  flex-direction: column;
  gap:40px;
  
`

const TitleBox = styled.div<CardTagTypes>`
  display: flex;
  justify-content: flex-start;

    h3 {
    margin-top:80px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    width: 286px;
    font-size: 24px;
    font-weight: 800;
    line-height: 28.13px;
    color: #F5F5F5;
    background-color: var(--cards-frontend-color);
    border-radius: 15px;
    text-transform: uppercase;
    ${(props)=>{
      switch (props.$categoria) {
      case "front end":
        return css`
          background-color: var(--cards-frontend-color);
        `;
      case "back end":
        return css`
          background-color: var(--cards-backend-color);
        `;
      default:
        return css`
          background-color: var(--cards-mobile-color);
        `;
    }}}
    @media (min-width: ${props=> props.theme.tabletBreakpoint}){
      margin-top:0;
      font-size: 32px;
      font-weight: 800;
      line-height: 37.5px;
      width: 432px;
    }
  }
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    justify-content: center;
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    justify-content: flex-start;
  }
`
const CardBox = styled.div`
  display: flex;
  gap:25px;
  overflow-x:scroll;
`

export function Cards(){
  const {openModal, openModalDialog}= useModal();
  const {categories, updateCards} = useCard();
  const [resData, setResData]= useState([]);

  useEffect(()=>{
    GetResponseCards();
  },[updateCards])
  
  const GetResponseCards = async ()=>{
    const {data}= await axios.get('http://localhost:3000/catalogo');
    setResData(data)
    await data.map((card:{categoria:string})=>{
      if(!categories.includes(card.categoria)) categories.push(card.categoria);
    });

  }

  return(
    <CardsSection
      $open={openModal || openModalDialog}>
        {categories.map((categoria:string, index:number)=>
      <CardsTag key={index}>
        <TitleBox $categoria={categoria}>
          <h3>{categoria}</h3>
        </TitleBox>
        <CardBox>
          {resData.filter((card:{categoria:string})=>card.categoria === categoria)
            .map((cardInfo:CardsTypes, index:number)=>
            <Card 
              key={index} 
              id={cardInfo.id}
              imagem={cardInfo.imagem}
              categoria={cardInfo.categoria}
              video={cardInfo.video}
              descricao={cardInfo.descricao}
              titulo={cardInfo.titulo}
            />
          )}
        </CardBox>
      </CardsTag>
      )}
    </CardsSection>
  )
}