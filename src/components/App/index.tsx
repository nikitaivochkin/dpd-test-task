import Table from 'components/Table';
import Loader from 'components/ui/Loader';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { getUsers } from 'store/slices/users';
import { TableColumn, User } from 'types';

import './styles.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const userList = useAppSelector((state) => state.users.list);
  const getUserListStatus = useAppSelector((state) => state.users.status);

  const isNone = getUserListStatus === 'none';
  const isRequested = getUserListStatus === 'requested';
  const isSuccess = getUserListStatus === 'success';
  const isFailed = getUserListStatus === 'failed';

  const hasUsers = !!userList.length;

  useEffect(() => {
    if (isNone && !hasUsers) {
      dispatch(getUsers());
    }
  }, []);

  const columns: Array<TableColumn> = [
    {
      name: '№',
      dataIndex: 'order',
      key: 'order',
      type: 'string',
      width: 30,
    },
    {
      name: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      type: 'img',
    },
    {
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
      type: 'string',
    },
    {
      name: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      type: 'string',
    },
    {
      name: 'Country',
      dataIndex: 'country',
      key: 'country',
      type: 'string',
    },
    {
      name: 'B-day',
      dataIndex: 'dob',
      key: 'dob',
      type: 'date',
    },
    {
      name: 'Email',
      dataIndex: 'email',
      key: 'email',
      type: 'email',
    },
    {
      name: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      type: 'phone',
    },
  ];

  const normalizedData: Array<User> = userList.map((user, i) => {
    const {
      id: { value },
      picture: { medium },
      name: { first, last },
      gender,
      location: { country },
      dob: { date },
      email,
      phone,
    } = user;

    return {
      order: i + 1,
      id: value,
      avatar: medium,
      name: `${first} ${last}`,
      gender,
      country,
      dob: date,
      email,
      phone,
    };
  });

  return (
    <section className="table-section">
      <h1>Users</h1>
      {
        (isNone || isRequested) && (
          <Loader />
        )
      }

      {
        isSuccess && (
          <div className="table">
            <Table
              columns={columns}
              data={normalizedData}
              pagination={{
                perPage: 10,
              }}
            />
          </div>
        )
      }

      {
        isFailed && (
          <div>
            Something went wrong ;(
          </div>
        )
      }
    </section>
  );
};

export default App;
