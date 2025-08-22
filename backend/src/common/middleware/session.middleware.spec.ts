import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { DatabaseService } from '@src/database/database.service';
import { RequestWithSession } from '@src/common/types/request-with-session';
import { SessionMiddleware } from '@src/common/middleware/session.middleware';

describe('SessionMiddleware', () => {
  let middleware: SessionMiddleware;
  let configService: Partial<ConfigService>;
  let databaseService: Partial<DatabaseService>;

  let next: jest.Mock;

  beforeEach(() => {
    databaseService = {
      session: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    } as unknown as Partial<DatabaseService>;

    configService = {
      get: jest.fn().mockReturnValue(100),
    } as unknown as Partial<ConfigService>;

    middleware = new SessionMiddleware(
      databaseService as DatabaseService,
      configService as ConfigService,
    );

    next = jest.fn();
  });

  it('should attach existing session to request', async () => {
    const req = {
      headers: { 'x-forwarded-for': '127.0.0.1' },
      socket: { remoteAddress: '127.0.0.1' },
    } as unknown as Request;

    (databaseService.session!.findFirst as jest.Mock).mockResolvedValue({ id: 'abc', credits: 50 });

    await middleware.use(req, {} as Response, next);

    expect((req as RequestWithSession).session).toEqual({ id: 'abc', credits: 50 });
    expect(next).toHaveBeenCalled();
  });

  it('should create and attach session if not found', async () => {
    const req = {
      headers: { 'x-forwarded-for': '127.0.0.1' },
      socket: { remoteAddress: '127.0.0.1' },
    } as unknown as Request;

    (databaseService.session!.findFirst as jest.Mock).mockResolvedValue(null);
    (databaseService.session!.create as jest.Mock).mockResolvedValue({ id: 'xyz', credits: 100 });

    await middleware.use(req, {} as Response, next);

    expect((req as RequestWithSession).session).toEqual({ id: 'xyz', credits: 100 });
    expect(next).toHaveBeenCalled();
  });
});
