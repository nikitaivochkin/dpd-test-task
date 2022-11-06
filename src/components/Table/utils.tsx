/* eslint-disable import/prefer-default-export */
import React from 'react';
import dayjs from 'dayjs';
import { ColumnTypes } from 'types';

export const columnTypes: ColumnTypes = {
  string: (value: string) => (
    <span>{ value }</span>
  ),
  img: (link: string) => (
    <img
      src={link}
      alt="avatar"
    />
  ),
  link: (link: string) => (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      { link }
    </a>
  ),
  email: (email: string) => (
    <a
      href={`mailto:${email}`}
    >
      { email }
    </a>
  ),
  phone: (phone: string) => (
    <a
      href={`tel:${phone}`}
    >
      { phone }
    </a>
  ),
  date: (value: string) => (
    <span>
      { dayjs(value).format('YYYY-MM-DD') }
    </span>
  ),
};
