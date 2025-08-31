import { useState, useEffect } from "react";

function UserForm({ user, onSubmit }) {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState(user ? user.phone : "");

  // Update form when editing a new user
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...user, name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name"
        value={name}  
        onChange={(e) => setName(e.target.value)}
        className="form-control mb-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone} 
        onChange={(e) => setPhone(e.target.value)}
        className="form-control mb-2"
        required
      />
      <button type="submit" className="btn btn-success">
        {user ? "Update User" : "Add User"}
      </button>
    </form>
  );
}

export default UserForm;
