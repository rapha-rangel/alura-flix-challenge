"use client"

import { CardsTypes } from "@/types/cards-types";
import { ReactNode, createContext, useState } from "react";
import { MessagePopUpTypes } from "@/types/message-popup-types";
import { numberIdGenerate } from "@/utils";

interface CardInfoContextType { 
  choisedCard: CardsTypes;
  categories: string[];
  updateCards: boolean;
  messageCardSuccessful:MessagePopUpTypes;
  handleInicialNewVideo: ()=> void;
  handleClear:()=> void;
  setChoisedCard:(value: CardsTypes)=>void;
  setCategories:(value: never[])=>void;
  setUpdateCards:(value: boolean) => void;
  setMessageCardSuccessful:(value: MessagePopUpTypes) => void;
}

export const initialValue ={
  id:"",
  categoria: "",
  imagem: "",
  video: "",
  descricao:"",
  titulo:""
};

export const CardInfoContext = createContext<CardInfoContextType>({
  categories: [],
  messageCardSuccessful: {
    text:"",
    backgroundColor:""
  },
  updateCards: false,
  choisedCard: initialValue,
  handleInicialNewVideo: ()=> {},
  handleClear: ()=> {},
  setChoisedCard: (value: CardsTypes) =>{},
  setCategories:(value: never[])=> {},
  setUpdateCards:(value: boolean) =>{},
  setMessageCardSuccessful:(value: MessagePopUpTypes) => {}
})

interface ProviderProps{
  children: ReactNode
}

export function CardInfoContextProvider({children}: ProviderProps){
  
  const [categories, setCategories] = useState([]);
  const [messageCardSuccessful, setMessageCardSuccessful] = useState({text:"", backgroundColor: ""})
  const [updateCards, setUpdateCards]= useState(false);
  const [choisedCard, setChoisedCard]= useState(initialValue);

  const handleClear =()=>{
    setChoisedCard({
      id: choisedCard.id,
      categoria: "",
      imagem: "",
      video: "",
      descricao:"",
      titulo:""
    })
  }
  const handleInicialNewVideo=()=>{
    setChoisedCard({...initialValue, id:numberIdGenerate().toString()});
  }
  
  return(
    <CardInfoContext.Provider 
      value={{
        choisedCard, setChoisedCard,
        categories, setCategories,
        updateCards, setUpdateCards,
        messageCardSuccessful, setMessageCardSuccessful, 
        handleClear, handleInicialNewVideo
      }}>
      {children}
    </CardInfoContext.Provider>
  )
}