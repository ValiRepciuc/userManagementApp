import { Search } from "lucide-react";

const Header = ({ onSearch }: { onSearch: (term: string) => void }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className="flex items-center justify-between bg-white px-10 py-6 text-gray-900 relative z-10">
      <h1 className="text-3xl font-semibold tracking-wide">
        Users Management Dashboard
      </h1>

      <div className="relative">
        <Search className="w-5 h-5 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

        <input
          type="text"
          placeholder="Search users..."
          onChange={handleSearchChange}
          className="bg-gray-200 text-gray-900 pl-10 pr-4 py-2 rounded-md outline-none border border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 focus:w-96 transition-all duration-200 w-64"
        />
      </div>
    </header>
  );
};

export default Header;
