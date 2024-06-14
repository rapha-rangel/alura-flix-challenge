"use client"
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { DefaultLayout } from "../../components/default-page-layout";
import { Main } from "../../components/main";
import { PopUp } from "@/components/popup";

export default function NewVideo(){
  return(
    <>
      <Main/>
      <PopUp/>
    </>
  )
}