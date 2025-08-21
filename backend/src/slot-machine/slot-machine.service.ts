import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';

@Injectable()
export class SlotMachineService {
  constructor(private readonly databaseService: DatabaseService) {}
}
