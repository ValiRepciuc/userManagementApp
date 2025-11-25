import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { User } from "../types/User";
import {
  usePostUserPermission,
  useDeleteUserPermission,
} from "../hooks/useUserPermissions";
import { useState } from "react";
import { Trash } from "lucide-react";

interface Permission {
  id: number;
  permissionName: string;
  userId: number;
}

interface PermissionsModal {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  userPermissions: Permission[];
  refetchPermissions: () => void;
}

const PermissionsModal = ({
  isOpen,
  onClose,
  user,
  userPermissions,
  refetchPermissions,
}: PermissionsModal) => {
  if (!isOpen || !user) return null;

  const [permissionInput, setPermissionInput] = useState<string>("");
  const { addPermission } = usePostUserPermission();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPermissionInput(e.target.value);
  };

  const handleAddPermission = async () => {
    if (!permissionInput.trim()) return;

    try {
      await addPermission(user.id, permissionInput);
      setPermissionInput("");
      refetchPermissions();
    } catch (error) {
      console.error("Failed to add permission:", error);
    }
  };

  const { removePermission } = useDeleteUserPermission();

  const handleDeletePermission = async (permissionId: number) => {
    try {
      await removePermission(permissionId);
      refetchPermissions();
    } catch (error) {
      console.error("Failed to remove permission:", error);
    }
  };

  return (
    <div className="fixed inset-0  bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-xl p-6 w-[500px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-400"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
          Permissions for {user.name}
        </h2>
        {userPermissions && userPermissions.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 flex flex-col justify-center">
            {userPermissions.map((permission) => (
              <li
                key={permission.id}
                className="text-gray-700 text-xl flex items-center justify-between"
              >
                {permission?.permissionName || "Unknown permission"}
                <button
                  className="ml-4 bg-purple-500 hover:bg-purple-600 h-10 w-10 rounded-lg flex items-center justify-center cursor-pointer active:opacity-90"
                  onClick={() => handleDeletePermission(permission.id)}
                >
                  <Trash className="w-5 h-5 text-white" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-xl">No permissions assigned</p>
        )}

        <label
          htmlFor="new-permission"
          className="block text-md font-bold text-purple-500 mt-8"
        >
          Add New Permission:
        </label>
        <input
          type="text"
          id="new-permission"
          className="mt-2 block w-full rounded-md h-10 px-2 py-2 border border-gray-400 shadow-md focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          value={permissionInput}
          onChange={handleInputChange}
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="bg-purple-600 w-full text-white px-10 py-3 mt-4 rounded-md shadow-md hover:bg-purple-700"
          onClick={handleAddPermission}
        >
          + Add Permission
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PermissionsModal;
