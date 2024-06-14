"use client"
import { ThemeProvider } from "styled-components";
import {ReactNode} from "react";
import { OpenModalContextProvider } from "../contexts/open-modal-context";
import { CardInfoContextProvider } from "@/contexts/card-info-context";
import StyledComponentsRegistry from "@/components/registry";
import { DefaultLayout } from "./default-page-layout";


interface DefaultProviderProps {
  children: ReactNode;
}

export function DefaultProvider ({children}: DefaultProviderProps){
  const theme= {
    laptopBreakpoint: "1024px",
    tabletBreakpoint: "650px",
  }
  return( 
    <CardInfoContextProvider>
      <OpenModalContextProvider>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <DefaultLayout>
              {children}
            </DefaultLayout>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </OpenModalContextProvider>
    </CardInfoContextProvider>
    
  )
}