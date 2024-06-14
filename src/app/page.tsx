'use client'

import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { DefaultLayout } from "../components/default-page-layout";
import { Banner } from "../components/banner";
import { Cards } from "../components/cards";
import { EditarCardModal } from "../components/editar-card-modal";
import { DeleteCardModal } from "@/components/delete-card-modal";
import { PopUp } from "@/components/popup";

export default function Home() {
  return (
    <>
      <Banner/>
      <Cards/>
      <EditarCardModal/>
      <DeleteCardModal/>
      <PopUp/>
    </>
      
  );
}
