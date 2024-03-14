import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { Link, Button } from "@nextui-org/react";
import { useModal } from "../../contexts/modalContext/modalContext";

const Header = () => {
  const navigate = useNavigate();
  const { toggleModal } = useModal();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="flex justify-between px-6 py-3 w-full z-10 sticky top-0 left-0 border-b bg-stone-50 z-20">
      <Link
        className="text-lg text-gray-700 font-roboto font-semiBold hover:text-gray-800 hover:opacity-100"
        href="/home">
        Home
      </Link>
      {userLoggedIn ? (
        <div>
          <Link
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="text-lg text-gray-700 font-roboto font-semiBold hover:text-gray-800 hover:opacity-100">
            Logout
          </Link>
          <Button onPress={toggleModal}>Open Modal</Button>
        </div>
      ) : (
        <div className="flex flex-row justify-end gap-x-3">
          <Link
            data-hover="false"
            className="text-lg text-gray-700 font-roboto font-semiBold hover:text-gray-800 hover:opacity-100"
            href={"/login"}>
            Login
          </Link>
          <Button
            as={Link}
            className="px-4 py-2 text-lg text-white font-roboto font-semiBold rounded-lg bg-rose-900 hover:bg-rose-950 hover:shadow-xl hover:opacity-100 transition duration-300"
            href={"/register"}
            data-hover="false">
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
