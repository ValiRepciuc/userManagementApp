import { motion } from "framer-motion";
import MenuDropdown from "./MenuDropdown";
import type { User } from "../types/User";
import { getAvatarUrl } from "../services/api";

interface CradProps {
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

const Card = ({
  id,
  name,
  email,
  phone,
  age,
  createdAt,
  avatar,
  handleModalOpen,
  refetch,
}: CradProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 12px 35px rgba(0,0,0,0.12)",
      }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 w-full max-w-md shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">User Info</h2>
        <MenuDropdown
          handleModalOpen={handleModalOpen}
          user={{ id, name, email, phone, age, createdAt, avatar }}
          refetch={refetch}
        />
      </div>
      <div className="flex items-center gap-4 mb-6">
        {avatar ? (
          <img
            src={getAvatarUrl(avatar)}
            className="w-16 h-16 rounded-full object-cover"
            alt="avatar"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-purple-600"></div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>
      </div>

      <div className="h-px bg-gray-300 my-4"></div>

      <div className="flex flex-col gap-2 text-gray-800 text-sm">
        <p>
          <span className="font-medium">Phone:</span> {phone}
        </p>

        <p>
          <span className="font-medium">Age:</span> {age} years
        </p>

        <p>
          <span className="font-medium">Created:</span> {createdAt}
        </p>
      </div>
    </motion.div>
  );
};

export default Card;
