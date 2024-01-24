import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { AuthGuard } from './../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CreateReportDto } from './dtos/createReport.dto';
import { ApproveReportDto } from './dtos/approveReport.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { GetEstimateDto } from './dtos/getEstimate.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(parseInt(id, 10), body.approved);
  }

  @Get()
  getEstimate(@Query() query:GetEstimateDto){
    return this.reportsService.createEstimate(query)
  }

}
