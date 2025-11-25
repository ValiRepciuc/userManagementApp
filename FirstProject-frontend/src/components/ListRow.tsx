import { motion } from "framer-motion";
import ModalDropdown from "./MenuDropdown";
import type { User } from "../types/User";
import type { MenuDropdownRef } from "./MenuDropdown";
import { useRef } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5201";

interface ListRowProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  createdAt: string;
  avatar?: string;

  handleModalOpen: (user: User) => void;
  handlePermissionsOpen: (user: User) => void;
  refetch: () => void;
}

const ListRow = ({
  id,
  name,
  email,
  phone,
  age,
  createdAt,
  avatar,
  handleModalOpen,
  handlePermissionsOpen,
  refetch,
}: ListRowProps) => {
  const menuRef = useRef<MenuDropdownRef>(null);

  const handleRowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    menuRef.current?.open();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.0, backgroundColor: "#f8f8f8" }}
      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:cursor-pointer"
      onClick={handleRowClick}
    >
      <div className="flex items-center gap-4 w-72">
        {avatar ? (
          <img
            src={`${API_URL}/avatars/${avatar}`}
            className="w-12 h-12 rounded-full object-cover"
            alt="avatar"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-purple-600"></div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>
      </div>

      <p className="text-gray-700">{phone}</p>
      <p className="text-gray-700">{age} years</p>
      <p className="text-gray-700">{createdAt}</p>

      <ModalDropdown
        ref={menuRef}
        user={{ id, name, email, phone, age, createdAt, avatar }}
        handleModalOpen={handleModalOpen}
        refetch={refetch}
        handlePermissionsOpen={handlePermissionsOpen}
      />
    </motion.div>
  );
};

export default ListRow;
