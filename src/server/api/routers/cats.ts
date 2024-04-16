const { faker } = require('@faker-js/faker');
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";


function generateCategories(num: any) {
    const categories = [];
    for (let i = 1; i <= num; i++) {
        categories.push({
            id: i,
            name: faker.commerce.department()
        });
    }
    return categories;
}

export const catRouter = createTRPCRouter({
    store: publicProcedure
        .mutation(async ({ ctx }) => {
            const categoriesToGenerate = 100;
            const existingCategoriesCount = await ctx.db.category.count();

            if (existingCategoriesCount === 0) {
                const categories = generateCategories(categoriesToGenerate);

                await ctx.db.category.createMany({
                    data: categories,
                    skipDuplicates: true,
                });
            }

            const allCategories = await ctx.db.category.findMany();
            return allCategories;
        }),
    get: publicProcedure
        .input(z.object({ userId: z.number() }))
        .mutation(async ({ ctx, input }: any) => {
            const categories = await ctx.db.category.findMany();
            const user = await ctx.db.user.findUnique({
                where: { id: input.userId },
                select: { categories: true, id: true }
            });

            const categoriesWithSelection = categories.map((category: any) => ({
                ...category,
                isSelected: user?.categories?.includes(category.id) && user?.id == input.userId,
            }));

            return categoriesWithSelection;
        }),
})
