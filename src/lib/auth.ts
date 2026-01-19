import { auth } from '@clerk/tanstack-react-start/server'

export type AuthState = {
  userId: string
  sessionId: string | null
}

export async function requireAuth(): Promise<AuthState> {
  const { userId, sessionId } = await auth()
  console.log(userId, sessionId)
  if (!userId) {
    throw new Error("Unauthorized")
    // throw new Error(JSON.stringify({ error: 'Unauthorized' }), {
    //   status: 402,
    //   headers: { 'Content-Type': 'application/json' },
    // })
  }
  
  return { userId: userId, sessionId: sessionId }
}
