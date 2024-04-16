import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { transporter } from "@/server/mailer";
import bcrypt from 'bcrypt';

const loginInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

const loginOutput = z.object({
    userId: z.number(),
    isVerified: z.boolean(),
    name: z.string()
});

export const authRouter = createTRPCRouter({
    get: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello  fromn`,
            };
        }),

    register: publicProcedure
        .input(z.object({
            name: z.string().min(1, "Name is required"),
            email: z.string().email("Invalid email address"),
            password: z.string().min(6, "Password must be at least 6 characters long")
        }))
        .mutation(async ({ ctx, input }) => {
            const emailExists = await ctx.db.user.findUnique({ where: { email: input.email } });
            if (emailExists) {
                throw new Error("Email already in use");
            }

            const hashedPassword = await hashPassword(input.password);
            const verificationToken = '123456'
            const tokenExpiration = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

            const newUser = await ctx.db.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    password: hashedPassword,
                    verificationToken,
                    tokenExpiration
                },
            });

            const mailOptions = {
                from: 'madhakuday@gmail.com',
                to: input.email,
                subject: 'Welcome to Our App - Verify Your Email',
                html: `Hi ${input.name},\nYour OTP to complete your registration is: ${verificationToken}`
            };

            await transporter.sendMail(mailOptions);

            return newUser;

        }),
    verifyemail: publicProcedure
        .input(z.object({
            email: z.string().email(),
            otp: z.string().length(6, "OTP must be 6 digits")
        })).mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { email: input.email }
            });

            if (!user) {
                throw new Error("User not found.");
            }

            if (user.verificationToken !== input.otp) {
                throw new Error("Invalid OTP.");
            }

            await ctx.db.user.update({
                where: { email: input.email },
                data: {
                    isVerified: true,
                }
            });

            return { user, message: "Email verified successfully!" }
        }),
    login: publicProcedure
        .input(loginInput)
        .output(loginOutput)
        .mutation(async ({ ctx, input }) => {

            const user = await ctx.db.user.findUnique({
                where: { email: input.email },
            });

            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordCorrect = await bcrypt.compare(input.password, user.password);
            if (!isPasswordCorrect) {
                throw new Error('Invalid password');
            }

            return {
                userId: user.id,
                isVerified: user.isVerified,
                name: user.name
            };
        }),

});

async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

