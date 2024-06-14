"use client"

import {styled, css} from "styled-components";
import logo from ".././assets/logo.png"
import { homeIcon, plusIcon } from "@/icons/icon";
import { Buttons } from "./button";
import { Icon } from "./icon";
import { PageTypes } from "@/types/page-types";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { useCard } from "@/hooks/useCard";

interface ButtonsTagTypes {
  selected: PageTypes
}

interface HeaderTagTypes {
  $openmodal: boolean
}
const HeaderTag = styled.div<HeaderTagTypes>`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 4px var(--primary-header-color) solid;
  box-shadow: 0px 5px 29px 0px var(--primary-header-shadow-color);
  background-color: var(--background-header);
  z-index: 10;
  filter: ${props=> props.$openmodal? "blur(5px)": "blur(0)"};
  opacity: ${props=> props.$openmodal? "0.5": "1"};
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    padding: 20px;
    justify-content: space-between;
    border-bottom: 4px var(--primary-header-color) solid;
    border-top: none;
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    padding: 42px;
    justify-content: space-between;
    border-bottom: 4px var(--primary-header-color) solid;
    border-top: none;
  }
`
const LogoTag = styled.img`
  width: 168.45px;
  height: 40px;
  display: none;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    display: initial;
  }
`
const ButtonsTag = styled.div<ButtonsTagTypes>`
  display: flex;
  transform:${({selected})=> selected ===PageTypes.EDIT ? " translateX(31px)": "translateX(-31px)"};
  gap: 5px;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    gap: 25px;
    transform:none;
  }
`
export function Header(){
  const {pagePriority, openModal, openModalDialog, setPagePriority } = useModal();
  const {handleClear, handleInicialNewVideo} = useCard();
  const router = useRouter();

  const handleHome = ()=>{
    handleClear();
    router.push("/");
    setPagePriority(PageTypes.EDIT);
  };

  const handleNewVideo = ()=>{
    handleInicialNewVideo();
    router.push('/newVideo')
    setPagePriority(PageTypes.CREATE);
  };

  return(
    <HeaderTag
      $openmodal={openModal||openModalDialog}>
      <LogoTag src={logo.src} alt='alura flix'/>
      <ButtonsTag
        selected={pagePriority}>
          <Buttons 
            handleAction={handleHome}
            type={"button"}
            card={"header"}
            selected={pagePriority === PageTypes.EDIT}
            footerborder={true}>
              <Icon
                selected={pagePriority === PageTypes.EDIT}>
                {homeIcon}
              </Icon>
              <p>home</p>
          </Buttons>
        
          <Buttons
            handleAction={handleNewVideo}
            type={"button"}
            card={"header"}
            selected={pagePriority === PageTypes.CREATE}
            footerborder={true}>
              <Icon
                selected={pagePriority === PageTypes.CREATE}>
                {plusIcon}
              </Icon>
              <p>novo video</p>
          </Buttons>
      </ButtonsTag>
    </HeaderTag>
  )
}