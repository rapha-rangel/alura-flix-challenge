import styled from "styled-components";
import {ReactNode} from "react";

interface IconsTypes {
  selected: boolean
}

interface IconsProps {
  selected: boolean
  children: ReactNode
}

const IconDiv = styled.div<IconsTypes>`
  color:#FFFFFF;
  font-size: ${props=>props.selected ? '30px': '45px'};
  display: flex;
  &:hover {
    color: var(--primary-header-color);
  }
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    display: none;
  }
`

export function Icon({children, selected}: IconsProps){
  return(
    <IconDiv
      selected={selected}>
        {children}
    </IconDiv>
  )
}