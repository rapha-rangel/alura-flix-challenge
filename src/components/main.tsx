import styled from "styled-components"
import { Form } from "./form"
const MainTag =styled.div`
  margin-bottom: 100px;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    margin-top: 47px;
  }
`

const TitleBox = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  color: white;
  gap: 10px;
  font-family: inherit;
  text-transform: uppercase;

  h2 {
    font-size: 40px;
    font-weight: 900;
    line-height: 46.88px;
    text-align: center;
  }

  p{
  font-size: 15px;
  font-weight: 400;
  line-height: 17.58px;
  text-align: center;
  }
`

export function Main(){
  return(
    <MainTag>
      <TitleBox>
        <h2>Novo video</h2>
        <p>Complete o formulario para criar um novo video</p>
      </TitleBox>
      <Form
        card={"criar"}
        title={"criar cartão"}/>
    </MainTag>
  )
}