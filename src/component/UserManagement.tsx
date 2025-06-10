import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, Save, X, Search } from "lucide-react";

// Define TypeScript interface for user
interface User {
  id: string;
  name: string;
  branch: string;
  city: string;
  phone: string;
}

const UserManagement: React.FC = () => {
  // State management
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    branch: "",
    city: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load sample data on initial render
  useEffect(() => {
    const sampleUsers: User[] = [
      {
        id: "1",
        name: "John Smith",
        branch: "Engineering",
        city: "New York",
        phone: "212-555-1234",
      },
      {
        id: "2",
        name: "Sarah Johnson",
        branch: "Marketing",
        city: "Chicago",
        phone: "312-555-6789",
      },
      {
        id: "3",
        name: "Michael Chen",
        branch: "Operations",
        city: "San Francisco",
        phone: "415-555-4321",
      },
    ];
    setUsers(sampleUsers);
  }, []);

  // Add new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.branch || !newUser.city || !newUser.phone) {
      alert("Please fill in all fields");
      return;
    }

    const user: User = {
      ...newUser,
      id: Date.now().toString(),
    };

    setUsers([...users, user]);
    setNewUser({ name: "", branch: "", city: "", phone: "" });
  };

  // Delete user
  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditForm(null);
    }
  };

  // Start editing a user
  const handleStartEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm({ ...user });
  };

  // Save edited user
  const handleSaveEdit = () => {
    if (!editForm) return;

    setUsers(users.map((user) => (user.id === editingId ? editForm : user)));

    setEditingId(null);
    setEditForm(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        User Management
      </h1>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Add New User Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Plus size={20} className="mr-2 text-green-600" />
          Add New User
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch
            </label>
            <input
              type="text"
              value={newUser.branch}
              onChange={(e) =>
                setNewUser({ ...newUser, branch: e.target.value })
              }
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter branch"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={newUser.city}
              onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <button
          onClick={handleAddUser}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add User
        </button>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    {editingId === user.id ? (
                      // Edit mode
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={editForm?.name || ""}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm!,
                                name: e.target.value,
                              })
                            }
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={editForm?.branch || ""}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm!,
                                branch: e.target.value,
                              })
                            }
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={editForm?.city || ""}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm!,
                                city: e.target.value,
                              })
                            }
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={editForm?.phone || ""}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm!,
                                phone: e.target.value,
                              })
                            }
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-900 p-1"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-900 p-1"
                          >
                            <X size={16} />
                          </button>
                        </td>
                      </>
                    ) : (
                      // View mode
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.branch}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleStartEdit(user)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
