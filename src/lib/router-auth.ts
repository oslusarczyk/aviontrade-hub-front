import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'

export async function checkAuth() {
  const {isAuthenticated } = await auth()
  if (isAuthenticated) {
    throw redirect({
        to: "/dashboard"
    })
  }
}