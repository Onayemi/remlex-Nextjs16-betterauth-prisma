import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./email"

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
      enabled: true, 
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
      sendResetPassword: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: "Reset your password",
          text: `Click the link to reset your password: ${url}`
        })
      },
      resetPasswordTokenExpiresIn: 3600,
    }, 
    account: {
      accountLinking: {
        enabled: true,
      }
    },
    socialProviders: { 
      github: { 
        clientId: process.env.GITHUB_CLIENT_ID!, 
        clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
      }, 
      google: { 
        clientId: process.env.GOOGLE_CLIENT_ID!, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
      }, 
    },
    plugins: [nextCookies()],
});