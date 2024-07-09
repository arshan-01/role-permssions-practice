import React, { useState } from 'react';

const AddRole = () => {
  const titles = ['Product', 'Order', 'Users', 'Settings', 'Reports', 'Admin', 'Role', 'Permission', 'Profile', 'Logout'];
  const permissions = ['Create', 'Add', 'Delete', 'View'];

  // State to manage the checked state of individual checkboxes
  const [checkedPermissions, setCheckedPermissions] = useState({});
  const [columnChecked, setColumnChecked] = useState({
    Create: false,
    Delete: false,
    Edit: false,
    View: false
  });

  // Function to toggle individual permission checkboxes
  const handlePermissionToggle = (title, permission) => {
    const isChecked = checkedPermissions[title]?.[permission] ?? false;
    setCheckedPermissions(prevState => ({
      ...prevState,
      [title]: {
        ...prevState[title],
        [permission]: !isChecked
      }
    }));
  };

  // Function to toggle entire column checkboxes
  const handleColumnToggle = (permission) => {
    const allChecked = !columnChecked[permission];

    setColumnChecked(prevState => ({
      ...prevState,
      [permission]: allChecked
    }));

    const updatedPermissions = {};
    titles.forEach(title => {
      updatedPermissions[title] = {
        ...checkedPermissions[title],
        [permission]: allChecked
      };
    });

    setCheckedPermissions(updatedPermissions);
  };

  const handleAddRole = () => {
    // Convert checkedPermissions object into an array of objects
    const roles = Object.keys(checkedPermissions).map(title => ({
      title,
      ...checkedPermissions[title]
    }));

    // Do something with the roles array (e.g., send it to backend, log it)
    console.log("Roles added:", roles);
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
          onClick={handleAddRole}
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
                    checked={columnChecked[permission]}
                    onChange={() => handleColumnToggle(permission)}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out mr-2"
                  />
                  {permission}
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
                    checked={checkedPermissions[title]?.[permission] ?? false}
                    onChange={() => handlePermissionToggle(title, permission)}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAddRole}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Role
        </button>
      </div>
    </div>
  );
};

export default AddRole;
