/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components"
import banner from '.././assets/banner.png';
import { useModal } from "@/hooks/useModal";

interface BannerTagTypes{
  $open: boolean
}

const BannerTag = styled.div<BannerTagTypes>`
  background:#0012338F ;
  position: relative;
  width: 100%;
  height: 832px;
  display:none;
  margin-bottom: 0px;
  filter: ${props=> props.$open? "blur(5px)": "blur(0)"};

  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    display:flex;
    margin-bottom: 100px;
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    margin-bottom: 0px;
  }
`
const BannerImage = styled.img`
  opacity: 0.3;
  position: absolute;
  top:-50px;
  left: 0;
  width: 100%;
  height: 100%;
`
const BannerCard = styled.div`
  position: absolute;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 30px;
  top: 35%;
  padding: 20px 50px;
  left: 0;
  z-index: 10;
  width: 100%;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    padding: 20px;
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    padding: 20px 50px;
  }
`
const BannerWrapper=styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 50%;

  div:first-of-type {
    background-color: var(--cards-frontend-color);
    font-family: inherit;
    color:#F5F5F5;
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 40px;

    @media (min-width: ${props=> props.theme.tabletBreakpoint}){
      padding: 20px;
      text-transform: capitalize;
      font-size: 60px;
      font-weight: 400;
      line-height: 70.31px;
      text-align: center;
    }

    @media (min-width: ${props=> props.theme.laptopBreakpoint}){
      text-transform: uppercase;
      font-size: 48px;
      font-weight: 800;
      line-height: 56.25px;
      text-align: center;
      
    }
  }

  div{
    display: flex;
    flex-direction: column;
    font-family: inherit;
    color: #F5F5F5;
    h2{
      font-size: 46px;
      font-weight: 400;
      line-height: 53.91px;
      padding-bottom: 10px;
    }
    p{
      font-size: 18px;
      font-weight: 300;
      line-height: 21.09px;
    }
  }
`
const BannerCardImage = styled.img`
  width: 646px;
  height: 334px;
  border-radius: 4px;
  border: 4px solid var(--cards-frontend-color);
  box-shadow: 0px 0px 17px 8px var(--cards-frontend-color) inset;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    max-width: 446px;
    width: 50%;
    height: 333.58px;
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    max-width: 646px;
    width: 50%;
    height: 334px;
  }
`
export function Banner(){

  const {openModal, openModalDialog} = useModal();
  return(
    <BannerTag
      $open={openModal||openModalDialog}>
      <BannerImage src={banner.src} alt=""/>
      <BannerCard>
        <BannerWrapper>
          <div>front end</div>
          <div>
            <h2>
              SEO com React
            </h2>
            <p>
              Eu to aqui pra nesse vídeo dizer que a gente vai aprender a começar uma app inspirada no desenho 
              Pokémon com Nextjs e React, ver algumas dicas sobre performance e de quebra conhecer uma plataforma 
              sensacional pra fazer deploy que é a Vercel. Tudo em 22 minutos nesse vídeo feito com todo o carinho 
              do mundo construindo uma "Pokedex"!
            </p>
          </div>
        </BannerWrapper>
        <BannerCardImage src={banner.src} alt=""/>
      </BannerCard>
    </BannerTag>

  )
}