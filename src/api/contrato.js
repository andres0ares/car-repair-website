import { getAllDefault, createDeafult, editDefault } from "./default";
import axios from "axios";

export function create(_) {
  return createDeafult(_, '/api/contrato')
}
