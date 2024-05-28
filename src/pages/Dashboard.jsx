import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDebouncedCallback } from "use-debounce";
function Dashboard() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(5);
  const [filtered, setFiltered] = useState(data);
  const [pageNo, setPageNo] = useState([1,1]);
  

  const handleSearch = useDebouncedCallback(async (term) => {
    try {
      const newData = data.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(term.toLowerCase()) ||
          user.lastName.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase()) ||
          user.id.toString().includes(term) ||
          user.contactNumber.includes(term)
        );
      });
      setFiltered(newData);
      setPageNo([Math.ceil(newData.length/show),pageNo[1]]);
    } catch (error) {
      console.log(error);
    }
  }, 300);
  useEffect(() => {
    const handleFetch = async () => {
      const response = await fetch(
        `https://hub.dummyapis.com/employee?noofRecords=1000`
      );
      const data = await response.json();
      setData(data);
      setFiltered(data);
      setPageNo([data.length/5,1]);
    };
    handleFetch();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl ml-20 font-extrabold tracking-tight text-indigo-600 m-10">
         API Custom Datatable
        </h2>
        <div className="m-16 mt-4 md:mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-4 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 outline-none"
          >
            Logout
          </Link>
        </div>
      </div>
      <h2 className="text-2xl ml-20 font-extrabold tracking-tight text-gray-900">
        Dashboard
      </h2>
      <div className="flex justify-center items-center space-x-40 ">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-indigo-500 "
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            name="search"
            onChange={(e) => handleSearch(e.target.value)}
            className="block w-80 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-indigo-500 "
            placeholder="Search Id, Name, Email, Contact"
            required
          />
          {/* <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 outline-none font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button> */}
        </div>

        <select
          id="show"
          onChange={(e) => {
            setShow(e.target.value);
            setPageNo([Math.ceil(filtered.length/e.target.value),pageNo[1]])
          }}
          className="bg-gray-50 border h-10 w-20 border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 outline-none focus:border-indigo-500 block p-2.5 "
        >
          <option>Show</option>
          <option value="5" select="true">
            5
          </option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className="flex justify-center m-8">
        <table className="text-sm text-left rtl:text-right text-gray-500  border-collapse border">
          <thead className="text-xs text-indigo-700 uppercase bg-indigo-50 rounded-md">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered
              .map((user, index) => (
                <tr key={index} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {user.id}
                  </th>
                  <td className="px-6 py-4">
                    {user.firstName + " " + user.lastName}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.contactNumber}</td>
                </tr>
              ))
              .slice((show * (pageNo[1] - 1)), show * pageNo[1])}
          </tbody>
        </table>
      </div>

      <div>
        <ul className="flex items-center justify-center -space-x-px h-10 text-base">
          <li>
            <button onClick={()=>{if(pageNo[1]>1)setPageNo([pageNo[0],pageNo[1]-1])}} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-indigo-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {
          Array.from({ length: 11 }, (_, i) => {
            let pageNoToShow=10;
            if (pageNo[1] <= 5) {
              pageNoToShow = i + 1;
            } else {
              pageNoToShow = i + pageNo[1] - 5;
            }if(pageNo[0]>=pageNoToShow){
            return (
              <li key={i}>
                <button onClick={() => { setPageNo([pageNo[0], pageNoToShow]) }} className={(pageNoToShow === pageNo[1] ? " bg-indigo-500 text-white" : "text-indigo-500  hover:bg-indigo-100 hover:text-gray-700")+" flex items-center justify-center px-4 h-10 leading-tight  border border-indigo-200"}>
                  {pageNoToShow}
                </button>
              </li>
            )}
          })
          
          }
         

          <li>
            <button onClick={()=>{if(pageNo[1]<pageNo[0])setPageNo([pageNo[0],pageNo[1]+1])}} className="flex items-center justify-center px-4 h-10 leading-tight text-indigo-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
