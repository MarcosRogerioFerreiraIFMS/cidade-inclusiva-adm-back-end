import { NextFunction, Request, Response } from 'express'
import { JWTPayload } from '../utils/jwtUtils'

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload
}

export type ControllerRequest<TReq extends Request = Request> = (
  req: TReq,
  res: Response,
  next: NextFunction
) => Promise<void>
