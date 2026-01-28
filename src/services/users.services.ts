import { cookies } from "next/headers"
import {env} from "@/env"


const AUTH_URL = env.AUTH_URL


export const userServices = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
           
            const res = await fetch("http://localhost:5000/api/auth/get-session",{
                headers:{
                    Cookie: cookieStore.toString(),
                },
                cache: "no-cache",
            })

            const session = await res.json();

            if(!session){
                return null
            }

            return session;


        } catch (error) {
            return {data: error}
        }
    }
}