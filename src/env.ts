
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: z.url().default("http://localhost:5000"),
    AUTH_URL: z.url(),
  },

  client: {},

  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL, 
    AUTH_URL: process.env.AUTH_URL,
  },
});