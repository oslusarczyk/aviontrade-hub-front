import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'

export const getUserId = createServerFn({ method: 'GET' }).handler(async () => {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("User not found or not authenticated")
    }
    return userId
})
