import { Test, TestingModule } from '@nestjs/testing';
import { TurnoversService } from './turnovers.service';

describe('TurnoversService', () => {
  let service: TurnoversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnoversService],
    }).compile();

    service = module.get<TurnoversService>(TurnoversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
