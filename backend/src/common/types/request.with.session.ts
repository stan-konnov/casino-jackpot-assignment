import { Request } from 'express';
import { Session } from '@prisma/client';

export type RequestWithSession = Request & { session: Session };
