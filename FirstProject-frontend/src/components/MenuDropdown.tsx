import { EllipsisVertical } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDeleteUser } from "../hooks/useUsers";
import type { User } from "../types/User";

export default function MenuDropdown({
  handleModalOpen,
  user,
  refetch,
}: {
  handleModalOpen: (user: User) => void;
  user?: User;
  refetch: () => void;
}) {
  console.log("Rendering MenuDropdown with user:", user);

  const { deleteUserById } = useDeleteUser(user?.id || 0, refetch);

  const handleDelete = () => {
    if (user) {
      deleteUserById();
    }
  };

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton
        className="
          inline-flex items-center justify-center 
          rounded-lg px-2 py-2 
          bg-transparent
          text-gray-700
          hover:bg-gray-200/50
          transition
        "
      >
        <EllipsisVertical className="w-5 h-5 text-gray-700" />
      </MenuButton>

      <MenuItems
        transition
        className="
          absolute right-0 z-50 mt-2 w-48 
          origin-top-right 
          rounded-lg 
          bg-white 
          text-black
          border border-black 
          shadow-md shadow-gray-400/40
          
          transition 
          data-closed:scale-95 data-closed:opacity-0
          data-enter:duration-100 data-leave:duration-75
        "
      >
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => user && handleModalOpen && handleModalOpen(user)}
                className={`
                  block w-full text-left px-4 py-2 text-sm rounded-t-lg
                  ${active ? "bg-gray-100" : ""}
                `}
              >
                Edit User
              </button>
            )}
          </MenuItem>

          <MenuItem>
            {({ active }) => (
              <button
                className={`
                  block w-full text-left px-4 py-2 text-sm rounded-b-lg
                  text-purple-600
                  ${active ? "bg-purple-100" : ""}
                `}
                onClick={handleDelete}
              >
                Delete User
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
