import { useState, useEffect } from "react";

function UserForm({ user, onSubmit, onCancel }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  // Update form when editing a different user
  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...user, name, email, phone });
    // Reset fields after adding new user
    if (!user) {
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        placeholder="Name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        className="form-control mb-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone || ""}
        onChange={(e) => setPhone(e.target.value)}
        className="form-control mb-2"
        required
      />
      <button type="submit" className="btn btn-success me-2">
        {user ? "Update User" : "Add User"}
      </button>
      {onCancel && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;
