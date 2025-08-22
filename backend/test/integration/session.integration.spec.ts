import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { AppModule } from '../../src/app.module';

let app: INestApplication;
let prisma: PrismaClient;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  prisma = new PrismaClient({ datasources: { db: { url: 'file:./test.db' } } });
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.session.deleteMany();
});

afterAll(async () => {
  await app.close();
  await prisma.$disconnect();
});

describe('Session integration', () => {
  it('creates session on credits request', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/credits');
    expect(res.status).toBe(200);

    const sessions = await prisma.session.findMany();
    expect(sessions.length).toBe(1);
  });

  it('creates session and decrements credits on slot machine play', async () => {
    await prisma.session.create({
      data: {
        id: 'test-session',
        credits: 10,
        ip: '127.0.0.1',
      },
    });

    let session = await prisma.session.findFirst({ where: { id: 'test-session' } });
    const initialCredits = session!.credits;

    await request(app.getHttpServer()).get('/api/v1/slot-machine/play');
    session = await prisma.session.findFirst();

    expect(session!.credits).toBe(initialCredits - 1);
  });

  it('does not create session on cashout, but deletes it', async () => {
    await prisma.session.create({
      data: {
        id: 'test-session',
        credits: 10,
        ip: '127.0.0.1',
      },
    });
    let session = await prisma.session.findFirst({ where: { id: 'test-session' } });
    expect(session).not.toBeNull();

    await request(app.getHttpServer()).post('/api/v1/cashout').send();
    session = await prisma.session.findFirst({ where: { id: 'test-session' } });

    expect(session).toBeNull();
  });
});
