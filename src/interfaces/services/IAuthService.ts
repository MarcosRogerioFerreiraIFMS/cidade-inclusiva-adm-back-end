import { LoginResponseDTO } from '../../dtos/response/LoginResponseDTO'

export interface IAuthService {
  login(loginData: unknown): Promise<LoginResponseDTO>
  validateToken(token: string): Promise<{ userId: string; email: string }>
}
