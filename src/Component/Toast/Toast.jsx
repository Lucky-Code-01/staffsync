import { toast } from "react-toastify";

export const Msgsuccessfull = (msg)=>{
    toast.success(msg,{
        position:'top-right'
    })
}

export const Msgerror = (msg)=>{
    toast.error(msg,{
        position:'top-right'
    })
}