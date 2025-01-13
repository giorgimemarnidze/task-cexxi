import React from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

interface PropsTable {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const UserTable: React.FC<PropsTable> = ({
  users,
  onEditUser,
  onDeleteUser,
  currentPage,
  onPageChange,
}) => {
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const deleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      onDeleteUser(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 min-w-[400px] text-xs xs:text-sm sm:text-base">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-1 py-1 xs:px-2 xs:py-1 sm:px-4 sm:py-2 text-left">
              Name
            </th>
            <th className="border border-gray-300 px-1 py-1 xs:px-2 xs:py-1 sm:px-4 sm:py-2 text-left">
              Email
            </th>
            <th className="border border-gray-300 px-1 py-1 xs:px-2 xs:py-1 sm:px-4 sm:py-2 text-left hidden xs:table-cell">
              Age
            </th>
            <th className="border border-gray-300 px-1 py-1 xs:px-2 xs:py-1 sm:px-4 sm:py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-1 py-1 xs:px-2 xs:py-1 sm:px-4 sm:py-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="border border-gray-300 px-1 py-1 xs:px-2 xs:py-1 sm:px-4 sm:py-2">
                <div className="flex flex-wrap gap-1">
                  <span className="truncate">{user.email}</span>
                </div>
              </td>
              <td className="border border-gray-300 px-1 py-1 xs:px-2 xs:py-1 sm:px-4 sm:py-2 hidden xs:table-cell">
                {user.age}
              </td>
              <td className="border border-gray-300 px-1 py-1 xs:px-2 xs:py-1 sm:px-4 sm:py-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onEditUser(user)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-xs xs:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs xs:text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 flex-wrap">
        {Array.from(
          { length: Math.ceil(users.length / usersPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
              className={`px-2 xs:px-3 py-1 mx-1 my-1 rounded transition-colors text-xs xs:text-sm ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default UserTable;
