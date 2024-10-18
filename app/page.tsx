"use client";

import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();

      const myUser = {
        id: 1,
        name: "Shkelzen Jashari",
        email: "jasharishkelzen@gmail.com",
        phone: "044 609 655",
      };

      const updatedUsers = [
        myUser,
        ...data.map((user: User, index: number) => ({
          ...user,
          id: index + 2,
        })),
      ];

      setUsers(updatedUsers);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateUser = (user: User) => {
    if (editingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u))
      );
      setEditingUser(null);
    } else {
      const newUser = { ...user, id: users.length + 1 }; // Ensure unique ID
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
  };

  const deleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <UserForm addUser={addOrUpdateUser} existingUser={editingUser} />
      {loading && <p className="text-blue-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <UserList users={users} onEdit={setEditingUser} onDelete={deleteUser} />
    </div>
  );
};

export default App;
