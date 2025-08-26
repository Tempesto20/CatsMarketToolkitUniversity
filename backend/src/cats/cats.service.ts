import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Cat } from './cat.entity';
import { SearchCatsParams } from './cats.controller';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

    async findAll(params: SearchCatsParams): Promise<Cat[]> {
    const { sortBy = 'id', order = 'ASC', currentPage = 1, isSell } = params;
    const limit = 6;
    const skip = (currentPage - 1) * limit;

    const queryBuilder = this.catsRepository.createQueryBuilder('cat');

    if (isSell !== undefined) {
        // Добавьте проверку на NULL если нужно
        queryBuilder.where('cat.isSell = :isSell OR (cat.isSell IS NULL AND :isSell IS NULL)', { isSell });
    }

    queryBuilder
        .orderBy(`cat.${sortBy}`, order)
        .skip(skip)
        .take(limit);

    return queryBuilder.getMany();
    }
}