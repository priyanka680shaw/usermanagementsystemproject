import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// loader
import ClipLoader from "react-spinners/ClipLoader";

function DisplayUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // loading
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

 //loder 
if (!userData) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ClipLoader color="#36d7b7" size={60} />
    </div>
  );
}

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-2">
      
      <div className="card shadow-sm w-100" style={{ maxWidth: "24rem" }}>
        <div className="card-header bg-dark text-white text-center">
          <h5 className="mb-0">User Details</h5>
        </div>
        <div className="card-body">
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>City:</strong> {userData.address?.city}</p>
          <p><strong>Zipcode:</strong> {userData.address?.zipcode}</p>
          <p><strong>Company:</strong> {userData.company?.name}</p>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/")}
          >
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisplayUserData;
