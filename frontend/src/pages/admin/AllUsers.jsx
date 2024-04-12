import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useActivateUserMutation,
  useDeactivateUserMutation,
} from "../../redux/api/usersApiSlice";
import Message from "../../components/Message";

const AllUsers = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [activate] = useActivateUserMutation();
  const [deactivate] = useDeactivateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableName, setEditableName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  const activateHandler = async (id) => {
    try {
      toast.success("User Activated Succesfully");
      await activate(id);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  const deActivateHandler = async (id) => {
    try {
      toast.success("User Deactivated Succesfully");
      await deactivate(id);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  const toggleEdit = (id, name, email) => {
    setEditableUserId(id);
    setEditableName(name);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        name: editableName,
        email: editableUserEmail,
      });

      setEditableUserId(null);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <div className="max-w-screen-lg px-5 py-8">
      <h1 className="text-xl font-semibold">Manage/Users</h1>
      <div className="mt-5 ">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data.message || error.message}
          </Message>
        ) : (
          <div className="overflow-y-scroll h-[28rem]">
            <table className="table">
              {/* head */}
              <thead className="border bg-sky-500 text-white">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Admin</th>
                  <th>Active</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>
                      <div className="">
                        {editableUserId === user._id ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={editableName}
                              onChange={(e) => setEditableName(e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />

                            <button
                              onClick={() => updateHandler(user._id)}
                              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            {user.name}
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.name, user.email)
                              }
                            >
                              <FaEdit className="ml-[1rem]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      {" "}
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="w-full p-2 border rounded-md"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p>{user.email}</p>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.name, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>

                    <td>{user.mobile}</td>
                    <td className="px-4 py-2">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {user.deactivated === false ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <th className="flex items-center justify-evenly">
                      {user.deactivated === false ? (
                        <button
                          onClick={() => deActivateHandler(user._id)}
                          className="btn btn-ghost btn-xs text-red-500"
                        >
                          deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => activateHandler(user._id)}
                          className="btn btn-ghost btn-xs text-sky-500 mr-3"
                        >
                          activate
                        </button>
                      )}
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="btn btn-ghost btn-xs text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
