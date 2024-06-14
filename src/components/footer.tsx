"use client"

import styled from "styled-components";
import logo from ".././assets/logo.png";
import { useModal } from "@/hooks/useModal";

interface FooterTagTypes{
  $open: boolean
}

const FooterTag = styled.div<FooterTagTypes>`
  width: 100%;
  padding: 20px;
  display: none;
  justify-content: center;
  align-items: center;
  border-top: 4px var(--primary-header-color) solid;
  box-shadow: 0px 5px 29px 0px var(--primary-header-shadow-color);
  background-color: var(--background-header);
  z-index: 10;
  filter: ${props=> props.$open? "blur(5px)": "blur(0)"};

  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    padding: 20px;
    display: flex;
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    padding: 42px;
    display: flex;
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
export function Footer(){
  const {openModal} = useModal();
  return(
    <FooterTag
      $open={openModal}>
      <LogoTag src={logo.src} alt="alura flix"/>
    </FooterTag>
  )
}