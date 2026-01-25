import { createFileRoute } from '@tanstack/react-router';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import { requireAuth } from '@/lib/api-auth';

const convex = new ConvexHttpClient(process.env.VITE_CONVEX_URL!);

export const Route = createFileRoute('/api/add-club')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { userId } = await requireAuth()
          const data = await request.json();
          console.log(data);
          const { clubData: personaId, clubName } = data;
          await convex.mutation(api.clubs.addClub, {
            userId,
            personaId,
            clubName,
          });

          return Response.json({
            success: true,
          });
        } catch (error) {
          return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
        }
      },
    },
  },
});
