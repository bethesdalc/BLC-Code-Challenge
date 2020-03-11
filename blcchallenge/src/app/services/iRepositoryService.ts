import { Injectable } from '@angular/core'

@Injectable()

export abstract class IRepositoryService {
        abstract getAll();

        abstract getById(id: number);

        abstract create(entity: any);

        abstract delete(id: Number);

        abstract update(entity: any);

        abstract saveToLocal();
}