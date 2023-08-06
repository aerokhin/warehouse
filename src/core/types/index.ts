import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

export enum TurnoverAction {
  add = 'ADD',
  remove = 'REMOVE'
}

export enum CacheTtl {
  day = 24 * 60 * 60
}

export interface IProductMeta {
  sizes: Size[];
}

export interface IProductLocation {
  section: string;
  amount: number;
}

export enum Size {
  xs = 'XS',
  s = 'S',
  m = 'M',
  l = 'L',
  xl = 'XL',
  xxl = 'XXL',
  xxxl = 'XXXL',
  toddler2 = '2T',
  toddler3 = '3T',
  toddler4 = '4T',
  toddler5 = '5T',
  children6 = '6',
  children7 = '7',
  children8 = '8',
  children10 = '10',
  children12 = '12',
  children14 = '14',
  children16 = '16',
  children18 = '18',
  children20 = '20'
}

export interface IHttpObjects {
  http: HttpArgumentsHost;
  req: Request;
  res: Response;
}
