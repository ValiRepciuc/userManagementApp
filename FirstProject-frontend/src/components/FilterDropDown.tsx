import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Funnel } from "lucide-react";

export default function FilterDropDown({
  orderByNameAsc,
  orderByNameDesc,
  orderByAgeAsc,
  orderByAgeDesc,
  orderByDateAsc,
  orderByDateDesc,
}: {
  orderByNameAsc: () => void;
  orderByNameDesc: () => void;
  orderByAgeAsc: () => void;
  orderByAgeDesc: () => void;
  orderByDateAsc: () => void;
  orderByDateDesc: () => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-md border border-gray-300 hover:bg-gray-100">
        <Funnel className="w-5 h-5 text-gray-600" />
        Filters
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-20 mt-2 w-60 origin-top-right rounded-md bg-white border border-gray-200 shadow-lg
            transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75"
      >
        <div className="py-1">
          <MenuItem>
            <button
              onClick={orderByNameAsc}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Order by Name (A → Z)
            </button>
          </MenuItem>

          <MenuItem>
            <button
              onClick={orderByNameDesc}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Order by Name (Z → A)
            </button>
          </MenuItem>

          <MenuItem>
            <button
              onClick={orderByAgeAsc}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Order by Age (Young → Old)
            </button>
          </MenuItem>

          <MenuItem>
            <button
              onClick={orderByAgeDesc}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Order by Age (Old → Young)
            </button>
          </MenuItem>

          <MenuItem>
            <button
              onClick={orderByDateAsc}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Order by Create (Oldest First)
            </button>
          </MenuItem>

          <MenuItem>
            <button
              onClick={orderByDateDesc}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Order by Create (Newest First)
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
