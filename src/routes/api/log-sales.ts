import { createFileRoute } from '@tanstack/react-router';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.VITE_CONVEX_URL!);

export const Route = createFileRoute('/api/log-sales')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await request.json();
          const items = Array.isArray(data) ? data : data.items;
          await convex.mutation(api.trades.addSales, { items });
          return Response.json({
            success: true,
          });
        } catch (error) {
          console.error('Error logging sales:', error);
          return Response.json(
            { error: 'Failed to log sales' },
            { status: 500 }
          );
        }
      },
    },
  },
});
