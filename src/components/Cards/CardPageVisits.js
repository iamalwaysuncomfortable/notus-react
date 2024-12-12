import React, { useState, useEffect } from "react";
import {data} from "autoprefixer";

export default function CardPageVisits() {
  const [tableData, setTableData] = useState([]);

  // Function to fetch data from the POST endpoint
  const fetchData = async () => {
    try {
      const response = await fetch("http://0.0.0.0:6035/mainnet/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("es1wktnccdrznk0hh7caqyq643da80hen7jh9230yfzw4kae2sm6qyskwuxl4"),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataString = await response.json(); // Assuming API sends a plain text string
      console.log(dataString);

      // Example response: "/argon/new-page.html,1,200,100,60.00,arrow-up,emerald"
      if (dataString) {
        const events = dataString["events"];
        for (let i = 0; i < events.length; i++) {
          const [program, functions, inputs, outputsValue, icon, color] = [events[i]["program"], [events["function"]]]

        }

        // Create a new row object
        const newRow = {
          program,
          functions,
          inputs,
          outputs: { value: outputsValue, icon, color },
        };

        // Append the new row to the existing data
        setTableData((prevData) => [...prevData, newRow]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Polling logic
  useEffect(() => {
    // Initial fetch
    fetchData();

    // Poll every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
      <>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Page visits
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Program
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Functions
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Inputs
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Outputs
                </th>
              </tr>
              </thead>
              <tbody>
              {tableData.map((row, index) => (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {row.program}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.functions}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.inputs}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i
                          className={`fas fa-${row.outputs.icon} text-${row.outputs.color}-500 mr-4`}
                      ></i>
                      {row.outputs.value}
                    </td>
                  </tr>
              ))}
              {tableData.map((row, index) => (



                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {row.program}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.functions}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.inputs}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i
                          className={`fas fa-${row.outputs.icon} text-${row.outputs.color}-500 mr-4`}
                      ></i>
                      {row.outputs.value}
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
  );
}
