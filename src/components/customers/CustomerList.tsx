import React from "react";

interface ICustomerList {
  customer: ICustomer[];
}

interface ICustomer {
  name: string;
}

export default function CustomerList(props: ICustomerList) {
  const { customer } = props;

  return (
    <div>
      <ul>
        {customer.map((customer, i) => {
          return <li key={i}>{customer.name} </li>;
        })}
      </ul>
    </div>
  );
}
