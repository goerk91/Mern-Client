import React, { useState, SyntheticEvent } from "react";

interface ICustomerForm {
  getCustomers: () => void;
}

export default function CustomerForm(props: ICustomerForm) {
  const [customerName, setCustomerName] = useState<string>("");
  const { getCustomers } = props;
  async function saveCustomer(e: SyntheticEvent) {
    e.preventDefault();
    const customerData = {
      name: customerName,
    };
    try {
      await fetch("http://localhost:5000/customer", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(customerData),
      });
      getCustomers();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={saveCustomer}>
        <input
          type="text"
          placeholder="Customer name"
          onChange={(e) => setCustomerName(e.target.value)}
          value={customerName}
        />
        <button type="submit">Save new Customer</button>
      </form>
    </div>
  );
}
