import React, { useState } from 'react';

const AddRole = () => {
  const titles = ['Product', 'Order', 'Users', 'Settings', 'Reports', 'Admin', 'Role', 'Permission', 'Profile', 'Logout'];
  const permissions = ['Create', 'Add', 'Delete', 'View'];

  // State to manage the checked state of global checkboxes
  const [globalChecks, setGlobalChecks] = useState(permissions.reduce((acc, perm) => {
    acc[perm] = false;
    return acc;
  }, {}));

  // Function to handle toggling all checkboxes in a column
  const handleGlobalCheck = (permission) => {
    const updatedGlobalChecks = {
      ...globalChecks,
      [permission]: !globalChecks[permission]
    };
    setGlobalChecks(updatedGlobalChecks);
  };

  return (
    <div className="overflow-x-auto px-16 py-10">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value=""
          placeholder="Enter role title"
          className="border rounded-md p-2 mr-2 w-full sm:w-1/3"
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Role
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            {permissions.map((permission) => (
              <th
                key={permission}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={globalChecks[permission]}
                    onChange={() => handleGlobalCheck(permission)}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2">{permission}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {titles.map((title) => (
            <tr key={title}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{title}</td>
              {permissions.map((permission) => (
                <td key={permission} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={globalChecks[permission]}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddRole;
