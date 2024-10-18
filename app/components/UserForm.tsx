import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserFormProps {
  addUser: (user: User) => void;
  existingUser?: User | null;
}

const UserForm = ({ addUser, existingUser }: UserFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (existingUser) {
      setName(existingUser.name);
      setEmail(existingUser.email);
      setPhone(existingUser.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [existingUser]);

  const validateForm = (): string => {
    if (name.length < 3) {
      return "Name must be at least 3 characters long.";
    }
    if (!email.includes("@") || !email.includes(".")) {
      return 'Email must contain "@" and ".".';
    }
    if (phone.length < 9) {
      return "Phone number must be at least 9 digits long.";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    const user: User = {
      id: existingUser ? existingUser.id : 0,
      name,
      email,
      phone,
    };
    addUser(user);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form
      className="mb-4 p-4 bg-white rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold mb-4 text-black">
        {existingUser ? "Edit User" : "Add User"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-col mb-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded w-64 text-black"
        />
      </div>
      <div className="flex flex-col mb-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded w-64 text-black"
        />
      </div>
      <div className="flex flex-col mb-3">
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded w-64 text-black"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {existingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
