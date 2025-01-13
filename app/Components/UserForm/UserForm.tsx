import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

interface Props {
  onClose: () => void;
  onSave: (user: User) => void;
  editingUser?: User | null;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const UserForm: React.FC<Props> = ({
  onClose,
  onSave,
  editingUser,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
    },
  });

  useEffect(() => {
    if (editingUser) {
      reset(editingUser);
    }
  }, [editingUser, reset]);

  const onSubmit = (data: Omit<User, "id">) => {
    if (
      !data.firstName.trim() ||
      !data.lastName.trim() ||
      !data.email.trim() ||
      !data.age
    ) {
      alert("you gotta fill everything ;)");
      return;
    }

    const newUser = editingUser
      ? { ...editingUser, ...data }
      : { id: Math.floor(Math.random() * 1000000), ...data };

    onSave(newUser);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  placeholder="First Name"
                  className={`border rounded p-2 w-full ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  placeholder="Last Name"
                  className={`border rounded p-2 w-full ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className={`border rounded p-2 w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <Controller
            name="age"
            control={control}
            rules={{
              required: "Age is required",
              min: { value: 1, message: "Age must be greater than 0" },
              max: { value: 120, message: "Age must be less than 120" },
            }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="number"
                  placeholder="Age"
                  className={`border rounded p-2 w-full ${
                    errors.age ? "border-red-500" : ""
                  }`}
                />
                {errors.age && (
                  <span className="text-red-500 text-sm">
                    {errors.age.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
