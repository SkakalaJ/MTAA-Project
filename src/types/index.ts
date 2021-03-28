import { Includeable } from "sequelize/types";
import sequelize from "sequelize";

export type FieldOrder<T> = {
    [P in keyof T]?: 'ASC' | 'DESC';
}

export type CommonOptions = {
    transaction?: sequelize.Transaction;
}


export type FindOptions<T> = CommonOptions & {
    select?: (keyof T)[] | Record<keyof T, any>;
    include?: Includeable[];
    order?: FieldOrder<T>;
    limit?: number;
    offset?: number;
    scopes?: string[];
}
