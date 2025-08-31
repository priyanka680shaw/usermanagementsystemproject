import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  // Add new user
  const handleAddUser = (newUser) => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, { ...data, id: Date.now() }]); // temporary ID for local state
        setShowForm(false);
      });
  };

  // Update user
  const handleUpdateUser = (updatedUser) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingUser(null);
      });
  };

  // Delete user
  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((err) => console.error(err));
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color="#36d7b7" size={60} />
      </div>
    );

  return (
    <div className="container mt-4 text-center">
      <h1 className="mb-3">User Management System</h1>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add User"}
      </button>

      {/* Add Form */}
      {showForm && (
        <UserForm
          user={null}
          onSubmit={handleAddUser}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingUser && (
        <div className="mt-4">
          <h2>Edit User</h2>
          <UserForm
            user={editingUser}
            onSubmit={handleUpdateUser}
            onCancel={() => setEditingUser(null)}
          />
        </div>
      )}

      {/* Users Table */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditingUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2 mt-md-0 mt-3"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-info btn-sm mt-lg-0 mt-3"
                    to={`/user/${user.id}`}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
