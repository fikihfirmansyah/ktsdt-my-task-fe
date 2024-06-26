// middleware/auth-check.ts

import axios from "axios";

export default async function meMiddleware({ store, redirect }: any) {
  if (process.client) {
    const token = localStorage.getItem("token");

    if (!token) {
      return redirect("/login");
    }

    try {
      const config = useRuntimeConfig();
      const { data } = await axios.get(`${config.public.apiBase}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      return redirect("/login");
    }
  }
}
