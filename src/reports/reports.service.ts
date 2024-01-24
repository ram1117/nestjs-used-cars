import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/createReport.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/getEstimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: id } });
    if (!report) throw new NotFoundException('Report Not Found');
    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate({ make, model, lat, lng, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('LOWER(make) = LOWER(:make)', { make })
      .where('LOWER(model) = LOWER(:model)', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -10 AND 10', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .getRawOne();
  }
}
