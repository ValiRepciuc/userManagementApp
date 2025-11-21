import { motion } from "framer-motion";
import ModalDropdown from "./MenuDropdown";
import type { User } from "../types/User";

interface ListRowProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  createdAt: string;
  avatar?: string;

  handleModalOpen: (user: User) => void;
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
  refetch,
}: ListRowProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, backgroundColor: "#f8f8f8" }}
      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200"
    >
      <div className="flex items-center gap-4 w-72">
        <img
          src={`http://localhost:5201/avatars/${avatar}`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>
      </div>

      <p className="text-gray-700">{phone}</p>
      <p className="text-gray-700">{age} years</p>
      <p className="text-gray-700">{createdAt}</p>

      <ModalDropdown
        user={{ id, name, email, phone, age, createdAt, avatar }}
        handleModalOpen={handleModalOpen}
        refetch={refetch}
      />
    </motion.div>
  );
};

export default ListRow;
