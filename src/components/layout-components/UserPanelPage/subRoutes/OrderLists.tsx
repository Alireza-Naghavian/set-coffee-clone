import Table from '@/components/UI/Table/Table';
import React from 'react'

const OrderLists = () => {
    return (
      <div className="md:h-[513px] h-[315px] px-4 md:max-h-[513px] overflow-y-auto">
        <Table>
          <Table.Header cols={"grid-cols-6"}>
            <th>عنوان</th>
            <th>قیمت</th>
            <th>دسته بندی</th>
            <th>تعداد</th>
            <th>وضعیت </th>
          </Table.Header>
          <Table.Body>
            <Table.Row cols="grid-cols-6">
              <td>قهوه عربیکا</td>
              <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
              <td>Primium Coffee</td>
              <td>{Number(2).toLocaleString("fa-Ir")}</td>
              <td className="!text-green-600">تکمیل شده</td>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table>
          <Table.Header cols={"grid-cols-6"}>
            <th>عنوان</th>
            <th>قیمت</th>
            <th>دسته بندی</th>
            <th>تعداد</th>
            <th>وضعیت </th>
          </Table.Header>
          <Table.Body>
            <Table.Row cols="grid-cols-6">
              <td>قهوه عربیکا</td>
              <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
              <td>Primium Coffee</td>
              <td>{Number(2).toLocaleString("fa-Ir")}</td>
              <td className="!text-green-600">تکمیل شده</td>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table>
          <Table.Header cols={"grid-cols-6"}>
            <th>عنوان</th>
            <th>قیمت</th>
            <th>دسته بندی</th>
            <th>تعداد</th>
            <th>وضعیت </th>
          </Table.Header>
          <Table.Body>
            <Table.Row cols="grid-cols-6">
              <td>قهوه عربیکا</td>
              <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
              <td>Primium Coffee</td>
              <td>{Number(2).toLocaleString("fa-Ir")}</td>
              <td className="!text-green-600">تکمیل شده</td>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table>
          <Table.Header cols={"grid-cols-6"}>
            <th>عنوان</th>
            <th>قیمت</th>
            <th>دسته بندی</th>
            <th>تعداد</th>
            <th>وضعیت </th>
          </Table.Header>
          <Table.Body>
            <Table.Row cols="grid-cols-6">
              <td>قهوه عربیکا</td>
              <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
              <td>Primium Coffee</td>
              <td>{Number(2).toLocaleString("fa-Ir")}</td>
              <td className="!text-green-600">تکمیل شده</td>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table>
          <Table.Header cols={"grid-cols-6"}>
            <th>عنوان</th>
            <th>قیمت</th>
            <th>دسته بندی</th>
            <th>تعداد</th>
            <th>وضعیت </th>
          </Table.Header>
          <Table.Body>
            <Table.Row cols="grid-cols-6">
              <td>قهوه عربیکا</td>
              <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
              <td>Primium Coffee</td>
              <td>{Number(2).toLocaleString("fa-Ir")}</td>
              <td className="!text-green-600">تکمیل شده</td>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table>
          <Table.Header cols={"grid-cols-6"}>
            <th>عنوان</th>
            <th>قیمت</th>
            <th>دسته بندی</th>
            <th>تعداد</th>
            <th>وضعیت </th>
          </Table.Header>
          <Table.Body>
            <Table.Row cols="grid-cols-6">
              <td>قهوه عربیکا</td>
              <td>{Number(1_200_000).toLocaleString("fa-Ir")} تومان</td>
              <td>Primium Coffee</td>
              <td>{Number(2).toLocaleString("fa-Ir")}</td>
              <td className="!text-green-600">تکمیل شده</td>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  };
export default OrderLists