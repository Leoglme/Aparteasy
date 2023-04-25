import { defineStore } from "pinia";
import type { User } from "@/api/user/user.model";
import axios from "axios";
import router from "@/router";
import { useReferentialStore } from "@/stores/referential.store";

const userInLocalStorage = localStorage.getItem("user");
const tokenInLocalStorage = localStorage.getItem("token");

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: userInLocalStorage
      ? JSON.parse(userInLocalStorage)
      : (undefined as User | undefined),
    token: tokenInLocalStorage
      ? JSON.parse(tokenInLocalStorage)
      : (undefined as string | undefined),
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setToken(token?: string) {
      if (token) {
        this.token = token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", JSON.stringify(token));
      }
    },
    async logout() {
      this.user = null;
      this.token = null;
      await localStorage.removeItem("token");
      await localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      await router.push("/login");
    },
  },
});
