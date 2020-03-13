import {IEmployee} from './iEmployee';

export interface IEmployeePunch {
        id: number;
        startTime: Date;
        endTime?: Date;
        employee: IEmployee;
}