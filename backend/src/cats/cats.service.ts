import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { SearchCatsParams } from './cats.controller';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}


  async findAll(params: SearchCatsParams): Promise<Cat[]> {
    const { sortBy = 'id', order = 'ASC', currentPage = 1, issell } = params;
    const limit = 6;
    const skip = (currentPage - 1) * limit;

    const queryBuilder = this.catsRepository.createQueryBuilder('cat');

    // проверка issellдля number типа
    if (issell !== undefined && issell !== null) {
      queryBuilder.where('cat.issell = :issell', { issell: issell });
    }

    const orderDirection = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    
    queryBuilder
      .orderBy(`cat.${sortBy}`, orderDirection)
      .skip(skip)
      .take(limit);

    return queryBuilder.getMany();
  }





  // Новый метод для получения всех котов
  async findAllCats(): Promise<Cat[]> {
    try {
      return await this.catsRepository.find({
        order: {
          id: 'ASC' // Сортировка по ID по возрастанию
        }
      });
    } catch (error) {
      console.error('Error in findAllCats:', error);
      throw error;
    }
  }



  async findOne(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOne({ where: { id } });
    
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    
    return cat;
  }
}