"use client";

import React, { useState, useEffect } from "react";
import UserTable from "../Components/UserTable/UserTable";
import { useRouter } from "next/navigation";
import UserForm from "../Components/UserForm/UserForm";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const HomePage: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();



  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSignOut = async () => {
    document.cookie = "auth_token=; Max-Age=0; path=/;";
    router.replace("/signin");
  };

  const openAddUserModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditUserModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const saveUser = (user: User) => {
    setUsers((prev) => {
      if (editingUser) {
        return prev.map((u) => (u.id === user.id ? user : u));
      }
      return [user, ...prev];
    });
    closeModal();
    setCurrentPage(1);
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-xl font-bold">Home Page</h1>
        <div className="flex gap-2">
          <button
            onClick={openAddUserModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add User
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      {filteredUsers.length === 0 && searchTerm && (
        <div className="text-center py-4 text-gray-500">
          No users found matching &quot;{searchTerm}&quot;
        </div>
      )}

      <UserTable
        users={filteredUsers}
        onEditUser={openEditUserModal}
        onDeleteUser={deleteUser}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg mx-4">
            <UserForm
              onClose={closeModal}
              onSave={saveUser}
              editingUser={editingUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
