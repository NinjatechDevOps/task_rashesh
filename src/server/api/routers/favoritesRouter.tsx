import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const favoritesRouter = createTRPCRouter({
    addFavorite: publicProcedure
        .input(z.object({ userId: z.number(), categoryId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: input.userId },
                select: { categories: true }
            });

            let newCategories = user?.categories ? [...user.categories, input.categoryId] : [input.categoryId];
            newCategories = Array.from(new Set(newCategories));

            return await ctx.db.user.update({
                where: { id: input.userId },
                data: { categories: newCategories },
            });
        }),

    removeFavorite: publicProcedure
        .input(z.object({ userId: z.number(), categoryId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: input.userId },
                select: { categories: true }
            });

            const newCategories = user?.categories.filter(cid => cid !== input.categoryId);

            return await ctx.db.user.update({
                where: { id: input.userId },
                data: { categories: newCategories },
            });
        }),
});
