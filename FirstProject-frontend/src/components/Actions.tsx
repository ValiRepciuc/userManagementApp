import { motion } from "framer-motion";
import { Grid, List } from "lucide-react";
import FilterDropDown from "./FilterDropDown";
import { useUsersGetAll } from "../hooks/useUsers";

const Actions = ({
  handleLayoutToggle,
  handleAddUserClick,
  orderByNameAsc,
  orderByNameDesc,
  orderByAgeAsc,
  orderByAgeDesc,
  orderByDateAsc,
  orderByDateDesc,
}: {
  handleLayoutToggle: (layout: "grid" | "list") => void;
  handleAddUserClick: () => void;
  orderByNameAsc: () => void;
  orderByNameDesc: () => void;
  orderByAgeAsc: () => void;
  orderByAgeDesc: () => void;
  orderByDateAsc: () => void;
  orderByDateDesc: () => void;
}) => {
  const { users } = useUsersGetAll();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-6 px-11"
    >
      <p className="text-lg font-medium text-gray-700">
        Total users:{" "}
        <span className="text-purple-600 font-semibold">{users.length}</span>
      </p>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleLayoutToggle("grid")}
        >
          <Grid className="w-6 h-6 text-gray-700" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleLayoutToggle("list")}
        >
          <List className="w-6 h-6 text-gray-700" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 rounded-md flex items-center gap-2"
        >
          <FilterDropDown
            orderByNameAsc={orderByNameAsc}
            orderByNameDesc={orderByNameDesc}
            orderByAgeAsc={orderByAgeAsc}
            orderByAgeDesc={orderByAgeDesc}
            orderByDateAsc={orderByDateAsc}
            orderByDateDesc={orderByDateDesc}
          />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06 }}
          className="bg-purple-600 text-white px-10 py-3 rounded-md shadow-md hover:bg-purple-700"
          onClick={handleAddUserClick}
        >
          + Add User
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Actions;
