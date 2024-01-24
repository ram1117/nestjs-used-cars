import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/createReport.dto';
import { User } from 'src/users/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('ReportsService', () => {
  let service: ReportsService;
  let reportRepository: Repository<Report>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: {
            create: () => ({ make: '', model: '' }),
            save: () => ({ make: '', model: '' }),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    reportRepository = module.get<Repository<Report>>(
      getRepositoryToken(Report),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a new report', async () => {
    const reportData: CreateReportDto = {
      make: '',
      model: '',
      year: 0,
      mileage: 0,
      lat: 0,
      lng: 0,
      price: 0,
    };
    const user: User = {
      id: 1,
      email: 'test@test.com',
      password: '',
      admin: false,
      reports: [],
    };
    const report = await service.create(reportData, user);
    expect(report).toBeDefined();
  });

  it('throws error when report is not found for approval', () => {
    expect(service.changeApproval(5, true)).rejects.toThrow(NotFoundException);
  });
});
