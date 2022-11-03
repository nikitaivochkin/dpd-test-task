/* eslint-disable no-unused-vars */
import { ReactElement } from 'react';

export type User = {
  id: string | number,
  avatar: string,
  name: string,
  gender: 'male' | 'female',
  country: string,
  dob: string,
  email: string,
  phone: string,
 };

export type Status = 'none' | 'requested' | 'failed' | 'success';

export type TableColumn = {
  name: string,
  dataIndex: string,
  key: string | number,
  type: 'string' | 'link' | 'email' | 'phone' | 'img' | 'date',
};

export type ColumnTypes = {
  string: (value: string) => ReactElement,
  img: (value: string) => ReactElement,
  link: (value: string) => ReactElement,
  email: (value: string) => ReactElement,
  phone: (value: string) => ReactElement,
  date: (value: string) => ReactElement,
};
