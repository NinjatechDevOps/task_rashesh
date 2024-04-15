import { api } from "@/trpc/server";

export const crerateUser = async (inputData: { name: string, email: string, password: string }) => {
    const data = await api.auth.register(inputData);
    return data
}