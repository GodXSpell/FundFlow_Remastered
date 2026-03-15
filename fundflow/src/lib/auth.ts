// TODO: NextAuth.js configuration
export const authConfig = {
  // This will be implemented when NextAuth.js is configured
  providers: [],
  pages: {
    signIn: "/login",
    signUp: "/register",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }: any) {
      return session
    },
    async jwt({ token, user }: any) {
      return token
    },
  },
}