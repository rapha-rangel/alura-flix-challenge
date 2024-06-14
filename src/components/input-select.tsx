import { useCard } from "@/hooks/useCard"
import { arrowDown } from "@/icons/icon"
import { useEffect, useState } from "react"
import {styled, css} from "styled-components"

interface InputSelectProps {
  name: string
  options: string[]
  card:string
  handleChange:(value:string)=> void
  placeholder: string
  borderSelect: boolean
}
interface DropDownHeaderTypes {
  $card: string
  $choised: string
  $border: boolean
}
interface SelectDropDownListTypes {
  $card: string
}

interface IconTagTypes {
  $changeselected: boolean
}


const SelectBox =styled.div<SelectDropDownListTypes>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    width: ${({$card})=> $card==="criar"? "50%": "100%"};
  }
  @media (min-width: ${props=> props.theme.laptopBreakpoint}){
    width: 100%;
    padding-right: ${({$card})=> $card==="criar"? "100px": "none"};
  }
  label {
    color: white;
    font-family: Source Sans Pro;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;
    text-transform: capitalize;
  }
`
const DropDownContainer = styled.div`
  width: 100%;
`
const DropDownHeader = styled.div<DropDownHeaderTypes>`
  position: relative;
  font-family: Source Sans Pro;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  border: 3px solid var(--primary-header-color);
  border-radius: 10px;
  padding: 12px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background: ${({$card})=> $card=== "criar"? "var(--background-main)": "var(--background-modal)"};  
  color: ${({$choised})=> $choised=== ""? "var(--selected-input-color)": "white"};
  ${(props)=>{
    if(props.$border) {
      return css`
        border: 3px solid red;
      `
    } else
    if(!props.$border &&  props.$card === "criar"){
      return css`
        border: 3px solid var(--background-header);
      `
    } else {
      return css`
        border: 3px solid var(--primary-header-color);
      `
    }
  }}
  
`
const DropDownListContainer = styled.div`
  position: relative;
`
const DropDownList = styled.ul<SelectDropDownListTypes>`
  position: absolute;
  background: ${({$card})=> $card=== "criar"? "var(--background-main)": "var(--background-modal)"};   
  width: 100%;
  border-radius: 10px;
  border:${({$card})=> $card === "criar"? "3px solid var(--background-header)":"3px solid var(--primary-header-color)"};
  border-top: none;
`
const ListItem = styled.li`
  list-style: none;
  padding: 10px 12px;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  font-family: Source Sans Pro;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: white;
    color: black;
  }
  &:first-child {
    border-radius: 8px 8px 0px 0px;
  }
  &:last-child {
    border-radius:0px 0px 8px 8px ;
  }
`



const IconTag = styled.div<IconTagTypes>`
  font-size: 30px;
  color: ${props=> !props.$changeselected ? "var(--selected-input-color)": "white"};
`

export function InputSelect({name, options, card, handleChange, placeholder,borderSelect}: InputSelectProps) {
  const {choisedCard} = useCard();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const [changeSelected, setChangeSelected] = useState(false);
  
  useEffect(()=>{
    if(card==="edit") setSelectedOption("")
  },[selectedOption]);

  const handleSelect =(option:string)=>{
    setSelectedOption(option);
    handleChange(option)
    setIsOpen(false);
    setChangeSelected(true);
  }

  return(
    <SelectBox
      $card={card}>
      <label>{name}</label>
      <DropDownContainer >
        <DropDownHeader
          $card={card}
          $border={borderSelect}
          $choised={choisedCard.categoria||""}
          onClick={() => setIsOpen(prev=> !prev)}>
            {selectedOption===""|| choisedCard.categoria===""? placeholder: selectedOption}
            <IconTag  $changeselected={changeSelected} >{arrowDown}</IconTag>
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList
              $card={card}>
              {options.map((option:string, index:number)=>(
                <ListItem
                  key={index}
                  onClick={()=>handleSelect(option)}>{option}</ListItem>
              ))}
            </DropDownList>
        </DropDownListContainer>
        )}
      </DropDownContainer>
    </SelectBox>
  )
}