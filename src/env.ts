
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod"


export const env = createEnv({
  server: {
    AUTH_URL: z.string().url(),
    API_URL: z.string().url(),
  },

  client: {
  
    NEXT_PUBLIC_BASE_API: z.string().url(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API, 
    AUTH_URL: process.env.AUTH_URL,
    API_URL: process.env.API_URL,
  },
});;

