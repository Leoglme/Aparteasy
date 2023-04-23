import { API_URL } from "@/env";
import axios from "axios";
import type { SignupCommand } from "@/api/auth/auth.model";
import { notify } from "@/plugins/notyf";
import { useAuthStore } from "@/stores/auth.store";
import type { User } from "@/api/user/user.model";
import { useRouter } from "vue-router";

export class Auth {
    private authStore;
    private headers;
    private router;

    constructor() {
        this.authStore = useAuthStore();
        this.router = useRouter();
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }

    init() {
        if (this.authStore.token && this.authStore.user) {
            this.authStore.setToken(this.authStore.token);
            Auth.user().then((response: { infos: {}; user: User }) => {
                this.authStore.setUser(response.user);
            });
        }
    }

    async login(body: {
        email: string;
        password: string;
    }): Promise<{ success: boolean }> {
        let success = false;
        notify.dismissAll();
        await axios
            .post(API_URL + "/api/auth/login", JSON.stringify(body), {
                headers: this.headers,
            })
            .then(async (response) => {
                await this.authStore.setToken(response.data.token.token);
                notify?.success("Connection successful, welcome!");
                this.authStore.setUser(response.data.user);
                success = true;
            })
            .catch((err) => {
                console.log("err", err);
                notify.error(
                    err.response?.data?.message ||
                    "An error occurred while connecting."
                );
            });
        return { success };
    }

  async signup(body: SignupCommand): Promise<{ success: boolean }> {
    let success = false;
    notify.dismissAll();
    await axios
        .post(API_URL + "/auth/signup", JSON.stringify(body), {
          headers: this.headers,
        })
        .then(async (response) => {
          await this.authStore.setToken(response.data.token);
          notify?.success("Connection successful, welcome!");
          this.authStore.setUser(response.data.user);
          success = true;
        })
        .catch((err) => {
          console.log("err", err);
          notify.error(
              err.response?.data?.message ||
              "An error occurred while connecting."
          );
        });
    return { success };
  }

    static user() {
        return axios
            .get(API_URL + "/auth/user")
            .then((response) => response.data)
            .catch((e) => e);
    }
    async verifyAccount(token: string | undefined, code: string | undefined) {
        axios.get(API_URL + "/auth/verify-account?token=" + token  + "&code=" + code).then((response) => {
            notify.success(response.data || "Account verify successfully");
            Auth.user().then((response: { infos: {}; user: User }) => {
                this.authStore.setUser(response.user);
                this.router.push("/")
            });
        }).catch((err) => {
            notify.error(err.response?.data?.message || "An error occurred while confirm your account.");
        });
    }
    async sendVerifyAccountEmail(token: string | undefined) {
        axios.get(API_URL + "/auth/send-verify-email?token=" + token).then((response) => {
            notify.success(response.data || "Email sent successfully");
            this.router.push("/")
        }).catch((err) => {
            notify.error(err.response?.data?.message || "An error occurred while sent mail.");
        });
    }
}
