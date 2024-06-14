import { useContext } from "react";
import { OpenModalContext } from "../contexts/open-modal-context";

export function useModal(){
  return useContext(OpenModalContext)
}