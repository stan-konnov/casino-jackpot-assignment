import request from 'supertest';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { AppModule } from '../../src/app.module';

let app: INestApplication;
let prisma: PrismaClient;

const TEST_IP = '127.0.0.1';

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });

  await app.init();

  prisma = new PrismaClient();
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
    await request(app.getHttpServer()).get('/api/v1/credits').set('x-forwarded-for', TEST_IP);

    const sessions = await prisma.session.findMany({ where: { ip: TEST_IP } });
    expect(sessions.length).toBe(1);
  });

  it('creates session and decrements credits on slot machine play', async () => {
    await prisma.session.create({
      data: {
        id: 'test-session',
        credits: 10,
        ip: TEST_IP,
      },
    });

    let session = await prisma.session.findFirst({ where: { ip: TEST_IP } });
    const initialCredits = session!.credits;

    await request(app.getHttpServer())
      .get('/api/v1/slot-machine/play')
      .set('x-forwarded-for', TEST_IP);

    session = await prisma.session.findFirst({ where: { ip: TEST_IP } });

    expect(session!.credits).toBe(initialCredits - 1);
  });

  it('does not create session on cashout, but deletes it', async () => {
    await prisma.session.create({
      data: {
        id: 'test-session',
        credits: 10,
        ip: TEST_IP,
      },
    });
    let session = await prisma.session.findFirst({ where: { ip: TEST_IP } });
    expect(session).not.toBeNull();

    await request(app.getHttpServer()).get('/api/v1/cashout').set('x-forwarded-for', TEST_IP);
    session = await prisma.session.findFirst({ where: { ip: TEST_IP } });

    expect(session).toBeNull();
  });
});
