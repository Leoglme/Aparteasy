import { defineStore } from "pinia";
import type { UserRole } from "@/api/referential/referential.model";

const rolesInLocalStorage = localStorage.getItem("user-roles");
const appConstantsInLocalStorage = localStorage.getItem("app-constants");

export const useReferentialStore = defineStore("referentialStore", {
  state: () => ({
    roles: rolesInLocalStorage
      ? JSON.parse(rolesInLocalStorage)
      : (undefined as UserRole[] | undefined),
    appConstants: appConstantsInLocalStorage
      ? JSON.parse(appConstantsInLocalStorage)
      : (undefined as UserRole[] | undefined),
  }),
  actions: {
    setRoles(roles: UserRole[]) {
      this.roles = roles;
      localStorage.setItem("user-roles", JSON.stringify(roles));
    },
    setAppConstants(constants: { [key: string]: string }[]) {
      this.appConstants = constants;
      localStorage.setItem("app-constants", JSON.stringify(constants));
    },
    getMeteoKey(): string | undefined {
      return this.appConstants["METEO_SERVICE_NAME"];
    },
    getCinemaKey(): string | undefined {
      return this.appConstants["CINEMA_SERVICE_NAME"];
    },
  },
});
