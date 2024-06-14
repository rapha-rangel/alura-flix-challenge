"use client"

import styled from "styled-components";


export const DefaultLayout = styled.section`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  @media (min-width: ${props=> props.theme.tabletBreakpoint}){
    flex-direction: column;
  }
`
