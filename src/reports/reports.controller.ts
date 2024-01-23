import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from './../guards/auth.guard';
import { CreateReportDto } from './dtos/createReport.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
