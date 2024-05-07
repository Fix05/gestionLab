import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    {
      "name": "Guantanamero Doe",
      "Salud": 3,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "Bob Johnson",
      "Salud": 0,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "Charlie Brown",
      "Salud": 3,
      "Calamidad doméstica": 0,
      "Otro": 1
    },
    {
      "name": "Ana Gómez",
      "Salud": 5,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "Alicia Martínez",
      "Salud": 6,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "Eva Martínez",
      "Salud": 0,
      "Calamidad doméstica": 0,
      "Otro": 1
    },
    {
      "name": "Sofía Lee",
      "Salud": 0,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "Olivia Taylor",
      "Salud": 10,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "Ava Hernández",
      "Salud": 1,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "Carlos López",
      "Salud": 4,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "Marco De Ali",
      "Salud": 6,
      "Calamidad doméstica": 2,
      "Otro": 0
    },
    {
      "name": "Juanito Pérez",
      "Salud": 8,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "David Anderson",
      "Salud": 0,
      "Calamidad doméstica": 0,
      "Otro": 0
    },
    {
      "name": "Pepe Fernández",
      "Salud": 2,
      "Calamidad doméstica": 0,
      "Otro": 0
    }
  ];



export default function Dashboard() {

    return (

        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Salud" stackId="a" fill="#8884d8" />
            <Bar dataKey="Calamidad doméstica" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Otro" stackId="a" fill="#852a9d" />
        </BarChart>
    )
}