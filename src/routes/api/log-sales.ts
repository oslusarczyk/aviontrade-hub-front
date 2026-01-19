import { createFileRoute } from '@tanstack/react-router';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import { requireAuth } from '@/lib/auth';

const convex = new ConvexHttpClient(process.env.VITE_CONVEX_URL!);

export const Route = createFileRoute('/api/log-sales')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          await requireAuth()
          const data = await request.json();
          const items = Array.isArray(data) ? data : data.items;
          await convex.mutation(api.trades.addSales, { items });
          return Response.json({
            success: true,
          });
        } catch (error) {
          return Response.json({ error: error }, { status: 500 })
        }
      },
    },
  },
});
