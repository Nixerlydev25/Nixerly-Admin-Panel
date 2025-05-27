import Instance from "@/services/api";
import { AuthEndpoints } from "@/types/types";

class AuthService {
  private static readonly authPath = "/auth";

  static login(userData: { email: string; password: string }) {
    return Instance.post(`${AuthService.authPath}/${AuthEndpoints.SIGNIN}`, userData);
  }

  static logout() {
    const url = `${AuthService.authPath}/${AuthEndpoints.LOGOUT}`;
    return Instance.get(url);
  }
}

export default AuthService;