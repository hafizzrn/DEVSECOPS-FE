import { api } from "@/lib/axios";
import { decodeJwt } from "@/lib/decode";
import { BASE_URL } from "@/lib/env";
import axios, { type AxiosError } from "axios";

export async function login(
  credentials: Record<"email" | "password", string> | undefined,
) {
  try {
    const response = await api.post(`${BASE_URL}/auth/login`, {
      email: credentials?.email,
      password: credentials?.password,
    });
    const token = response.data?.data.access_token;

    const decoded = decodeJwt(token);
    if (token) {
      return {
        email: credentials?.email,
        id: decoded.user_id,
        access_token: token,
      };
    }
    return null;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err as AxiosError;
    } else {
      throw new Error("Terjadi kesalahan saat masuk");
    }
  }
}
