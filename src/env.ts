import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";


export const env = createEnv({
    server: {
        Backend_Url: z.url(),
        AUTH_URL: z.url()
    },

    client: {},

    runtimeEnv: {
        Backend_Url: process.env.Backend_Url,
        AUTH_URL: process.env.AUTH_URL
    }
})