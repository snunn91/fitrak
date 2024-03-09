import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { Link, Button } from "@nextui-org/react";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="flex justify-between px-6 py-3 w-full z-10 sticky top-0 left-0 border-b bg-stone-50">
      <Link className="text-lg text-blue-950"></Link>
      {userLoggedIn ? (
        <button
          onClick={() => {
            doSignOut().then(() => {
              navigate("/login");
            });
          }}
          className="text-lg text-blue-950">
          Logout
        </button>
      ) : (
        <div className="flex flex-row justify-end gap-x-3">
          <Link className="text-lg text-blue-950" href={"/login"}>
            Login
          </Link>
          <Button
            variant="solid"
            as={Link}
            className="text-lg text-stone-50 bg-orange-300"
            href={"/register"}>
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
