import React, { useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border-b text-black">Name</th>
            <th className="py-2 px-4 border-b text-black">Email</th>
            <th className="py-2 px-4 border-b text-black">Phone</th>
            <th className="py-2 px-4 border-b text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              {" "}
              <td className="py-2 px-4 border-b text-black">{user.name}</td>
              <td className="py-2 px-4 border-b text-black">{user.email}</td>
              <td className="py-2 px-4 border-b text-black">{user.phone}</td>
              <td className="py-2 px-4 border-b text-black">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline ml-4"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
