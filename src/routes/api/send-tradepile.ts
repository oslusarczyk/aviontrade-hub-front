// src/routes/api/hello.ts
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/send-tradepile')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const data = await request.json()
        console.log(data)
        return Response.json({ message: 'Tradepile received' })
      },
    },
  },
});
