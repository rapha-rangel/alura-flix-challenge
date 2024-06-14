import { CardInfoContext } from "@/contexts/card-info-context";
import { useContext } from "react";

export function useCard(){
  return useContext(CardInfoContext)
}