import { Controller, Get, Query, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { CatsService } from './cats.service';

export interface SearchCatsParams {
  sortBy?: string;
  order?: string;
  currentPage?: number;
  issell?: string; // Параметры запроса всегда строки
}

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(@Query() params: SearchCatsParams) {
    try {
      if (params.order && !['ASC', 'DESC', 'asc', 'desc'].includes(params.order)) {
        params.order = 'ASC';
      }
      
      // Преобразуем currentPage в число
      if (params.currentPage) {
        params.currentPage = Number(params.currentPage);
      }
      
      return await this.catsService.findAll(params);
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }


    // Новый маршрут для получения всех котов
  @Get('fullCat')
  async findAllCats() {
    try {
      return await this.catsService.findAllCats();
    } catch (error) {
      console.error('Error in findAllCats:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.catsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOne:', error);
      throw new NotFoundException('Cat not found');
    }
  }
}