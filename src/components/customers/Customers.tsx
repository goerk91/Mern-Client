import React, { useState, useEffect } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

interface ICustomer {
  name: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    getCustomers();
  }, []);

  async function getCustomers() {
    try {
      await fetch("http://localhost:5000/customer", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setCustomers(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <CustomerForm getCustomers={getCustomers} />
      <CustomerList customer={customers} />
    </div>
  );
}
