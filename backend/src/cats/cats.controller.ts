import { Controller, Get, Query } from '@nestjs/common';
import { CatsService } from './cats.service';

export interface SearchCatsParams {
  sortBy?: string;
  order?: 'ASC' | 'DESC';
  currentPage?: number;
  isSell?: number;
}

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(@Query() params: SearchCatsParams) {
    return this.catsService.findAll(params);
  }
}