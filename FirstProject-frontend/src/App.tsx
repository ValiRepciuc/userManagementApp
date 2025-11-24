import Header from "./components/Header";
import Actions from "./components/Actions";
import Card from "./components/Card";
import ListRow from "./components/ListRow";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useCreateUser, useUpdateUser } from "./hooks/useUsers";
import { useUserSpecification } from "./hooks/useUserSpecification";
import type { User } from "./types/User";
import { formatUsers } from "./utils/formatUsers";

function App() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");

  const [sortType, setSortType] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { users, refetch } = useUserSpecification({
    search: searchTerm,
    filterBy: searchTerm ? "name" : undefined,
    sort: sortType,
  });

  console.log(
    "Users avatar in App.tsx:",
    users.map((u) => u.avatar)
  );

  let shownUsers: User[] = users;

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleChangeBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleAddUserClick = () => {
    setIsModalOpen(true);
    setModalMode("add");
    setSelectedUser(null);
  };

  const handleModalOpen = (user: User) => {
    setIsModalOpen(true);
    setModalMode("edit");
    setSelectedUser(user);

    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  const { createUser } = useCreateUser(refetch);
  const { updateUser } = useUpdateUser(selectedUser?.id, refetch);

  shownUsers = formatUsers(shownUsers);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col min-h-screen bg-gray-200">
        <Header onSearch={setSearchTerm} />
        <Actions
          handleLayoutToggle={setLayout}
          handleAddUserClick={handleAddUserClick}
          orderByNameAsc={() => setSortType("name_asc")}
          orderByNameDesc={() => setSortType("name_desc")}
          orderByAgeAsc={() => setSortType("age_asc")}
          orderByAgeDesc={() => setSortType("age_desc")}
          orderByDateAsc={() => setSortType("created_asc")}
          orderByDateDesc={() => setSortType("created_desc")}
        />

        <main className="p-10 flex-1">
          {layout === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {shownUsers.map((u, i) => (
                <Card
                  handleModalOpen={handleModalOpen}
                  key={i}
                  {...u}
                  refetch={refetch}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <p className="w-72 font-semibold text-gray-900 pl-16">Name</p>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="font-semibold text-gray-900">Age</p>
                <p className="font-semibold text-gray-900">Created At</p>
                <div className="w-6"></div>
              </div>
              {shownUsers.map((u, i) => (
                <ListRow
                  handleModalOpen={handleModalOpen}
                  key={i}
                  {...u}
                  refetch={refetch}
                />
              ))}
            </div>
          )}
        </main>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {modalMode === "add" ? "Add New User" : "Edit User"}
          </h2>

          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();

              if (modalMode === "add") {
                createUser(name, email, phone, avatarFile, birthDate);
                setIsModalOpen(false);
              } else {
                updateUser(
                  name,
                  email,
                  phone,
                  avatarFile ? avatarFile.name : selectedUser?.avatar,
                  birthDate
                );
                setIsModalOpen(false);
              }
            }}
          >
            <label>Name:</label>
            <input
              type="text"
              value={name}
              defaultValue={modalMode === "edit" ? selectedUser?.name : ""}
              onChange={handleChangeName}
              className="border px-3 py-2 rounded-md"
              required
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleChangeEmail}
              className="border px-3 py-2 rounded-md"
              required
            />
            <label>Date of birth:</label>
            <input
              type="date"
              value={birthDate}
              onChange={handleChangeBirthDate}
              className="border px-3 py-2 rounded-md"
              required
            />
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              defaultValue={modalMode === "edit" ? selectedUser?.phone : ""}
              onChange={handleChangePhone}
              className="border px-3 py-2 rounded-md"
              required
            />
            <label>Avatar:</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border px-3 py-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md mt-2"
            >
              {modalMode === "add" ? "Add User" : "Save Changes"}
            </button>
          </form>
        </Modal>
        <Footer />
      </div>
    </>
  );
}

export default App;
