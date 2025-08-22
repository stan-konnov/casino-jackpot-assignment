import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

import { DatabaseService } from '@src/database/database.service';
import { RequestWithSession } from '@src/common/types/request-with-session';
import { SESSION_CREATION_EXCLUDED_PATHS } from '@src/common/constants';

/**
 * Middleware to handle user sessions based on IP address.
 * It checks if a session exists for the given IP, and if not, creates a new session with default credits.
 */
@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async use(request: Request, _response: Response, next: NextFunction): Promise<void> {
    const ip = String(
      request.headers['x-forwarded-for']?.toString().split(',')[0] || request.socket.remoteAddress,
    );

    let session = await this.databaseService.session.findFirst({
      where: { ip },
    });

    // If session does not exist and the request URL is not excluded, create a new session
    if (!session && !SESSION_CREATION_EXCLUDED_PATHS.includes(request.baseUrl)) {
      session = await this.databaseService.session.create({
        data: {
          ip,
          credits: Number(this.configService.get('DEFAULT_ALLOCATED_CREDITS')),
        },
      });
    }

    // Attach session to request with custom type
    (request as RequestWithSession).session = session;

    next();
  }
}
