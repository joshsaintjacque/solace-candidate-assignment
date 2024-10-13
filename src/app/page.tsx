"use client";

import { useEffect, useState } from "react";
import { Advocate } from "../db/schema";

interface Person {
  firstName: string;
  lastName: string;
}

const fullName = (person: Person) => `${person.firstName} ${person.lastName}`.trim();

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        console.log("fetching advocates...");
        const response = await fetch("/api/advocates");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      } catch (error) {
        console.error("Failed to fetch advocates:", error);
        setErrorMessage("Failed to fetch advocates. Please try again later.");
      }
    };

    fetchAdvocates();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  return (
    <main className="p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Solace Advocates</h1>
      <div className="mb-6">
        <p className="text-lg mb-2 font-medium">Search</p>
        <p className="mb-4">
          Searching for: <span className="font-semibold text-gray-700">{searchTerm}</span>
        </p>
        <input
          className="border border-gray-300 p-2 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={onChange}
          value={searchTerm}
          placeholder="Search advocates by name, city, degree, etc."
          aria-label="Search advocates"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded md:ml-2 mt-2 md:mt-0 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClick}
        >
          Reset Search
        </button>
      </div>
      {errorMessage && (
        <div className="text-red-500 mb-6 text-center font-semibold">
          {errorMessage}
        </div>
      )}
      <div className="hidden md:block">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">City</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Degree</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Specialties</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Years of Experience</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate) => (
              <tr key={advocate.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-gray-700">{fullName(advocate)}</td>
                <td className="py-3 px-4 border-b text-gray-700">{advocate.city}</td>
                <td className="py-3 px-4 border-b text-gray-700">{advocate.degree}</td>
                <td className="py-3 px-4 border-b text-gray-700">
                  <ul className="text-sm text-gray-700">
                    {advocate.specialties.map((s) => (
                      <li key={s} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2">
                        {s}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-4 border-b text-gray-700">{advocate.yearsOfExperience}</td>
                <td className="py-3 px-4 border-b text-gray-700">{advocate.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden">
        {filteredAdvocates.map((advocate) => (
          <div key={advocate.id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">{fullName(advocate)}</h2>
            <p className="text-gray-600"><strong>City:</strong> {advocate.city}</p>
            <p className="text-gray-600"><strong>Degree:</strong> {advocate.degree}</p>
            <p className="text-gray-600"><strong>Specialties:</strong></p>
            <ul className="text-sm text-gray-700 mt-2 md:mt-0">
              {advocate.specialties.map((s) => (
                <li key={s} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2">
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-gray-600"><strong>Years of Experience:</strong> {advocate.yearsOfExperience}</p>
            <p className="text-gray-600"><strong>Phone Number:</strong> {advocate.phoneNumber}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
