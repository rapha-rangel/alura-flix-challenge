"use client"

import { PageTypes } from "@/types/page-types";
import { ReactNode, createContext, useState } from "react";

export const OpenModalContext = createContext({
  openModal:false,
  openModalDialog: false,
  openPopUp:false,
  pagePriority: PageTypes.EDIT,
  setOpenModal: (value: boolean) =>{},
  setOpenModalDialog: (value: boolean)=> {},
  setPagePriority: (value: PageTypes)=> {},
  setOpenPopUp: (value: boolean) =>{}
})

interface ProviderProps{
  children: ReactNode
}

export function OpenModalContextProvider({children}: ProviderProps){
  const [openModal, setOpenModal]= useState(false);
  const [openModalDialog, setOpenModalDialog]= useState(false);
  const [openPopUp, setOpenPopUp]= useState(false);
  const [pagePriority, setPagePriority]= useState(PageTypes.EDIT);

  return(
    <OpenModalContext.Provider 
      value={{
        openModal, setOpenModal, 
        openModalDialog, setOpenModalDialog,
        pagePriority, setPagePriority,
        openPopUp, setOpenPopUp
      }}>
      {children}
    </OpenModalContext.Provider>
  )
}