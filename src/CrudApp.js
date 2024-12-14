import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported

const CrudApp = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(null);

  // Fetch users using axios
  useEffect(() => {
    // Use axios to fetch data from an external API
    axios.get('/data.json')
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error loading JSON:", error));
  }, []);

  // Create: Add a new user
  const handleCreate = (e) => {
    e.preventDefault();

    const newUserData = {
      ...newUser,
      id: users.length + 1, // Generating an ID for new users (for simplicity)
    };

    // Simulating adding a user (in-memory)
    setUsers([...users, newUserData]);
    setNewUser({ name: '', email: '' }); // Reset form
  };

  // Edit: Set the user to edit
  const handleEdit = (user) => {
    setEditing(user);
    setNewUser({ name: user.name, email: user.email });
  };

  // Update: Save the edited user
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUsers = users.map(user => 
      user.id === editing.id ? { ...user, ...newUser } : user
    );
    
    setUsers(updatedUsers);
    setEditing(null);
    setNewUser({ name: '', email: '' });
  };

  // Delete: Remove a user
  const handleDelete = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="container mt-4">
      <h1>User Management</h1>

      {/* Form to create or update a user */}
      <form onSubmit={editing ? handleUpdate : handleCreate}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editing ? 'Update' : 'Create'} User
        </button>
      </form>

      {/* Users List */}
      <h3 className="mt-4">Users</h3>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{user.name}</strong> ({user.email})
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudApp;
