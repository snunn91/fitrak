import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useModal } from "../../contexts/modalContext/modalContext";
import Logo from "../../assets/img/header/fitrak-black-test.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { toggleModal } = useModal();
  const { userLoggedIn } = useAuth();
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="flex justify-between border-b-1 border-solid border-stone-200"
      maxWidth="full"
      shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/home">
            <div
              style={{ backgroundImage: `url(${Logo})` }}
              className="relative h-[23px] w-[120px] bg-cover bg-center bg-no-repeat"></div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex justify-end items-center">
        {/* <Link
          className="text-lg text-gray-700 font-raleway font-semiBold hover:text-gray-800 hover:opacity-100"
          href="/home">
          Home
        </Link> */}
        {userLoggedIn ? (
          <div className="flex items-center gap-5 justify-end">
            <NavbarItem className="after:pt-[0.75rem] after:pr-[0] after:pb-[0.75rem] after:pl-[1.25rem] after:border-r after:border-stone-200">
              <Button
                data-hover="false"
                className="px-4 py-2 text-md text-white font-raleway rounded-lg bg-rose-900 hover:bg-rose-950 hover:shadow-xl hover:opacity-100 transition duration-300"
                onClick={() => toggleModal("workoutFilterModal")}>
                Start a Workout
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:block">
              <Link
                href="#"
                onPress={() => {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                }}
                className="text-lg text-gray-700 font-raleway font-semiBold hover:text-gray-800 hover:opacity-100">
                Logout
              </Link>
            </NavbarItem>
          </div>
        ) : (
          <div className="flex items-center gap-5 justify-end">
            <NavbarItem className="hidden sm:block">
              <Link
                data-hover="false"
                className="text-lg text-gray-700 font-raleway hover:text-gray-800 hover:opacity-100"
                href={"/login"}>
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                className="px-4 py-2 text-lg text-white font-raleway font-semiBold rounded-lg bg-rose-900 hover:bg-rose-950 hover:shadow-xl hover:opacity-100 transition duration-300"
                href={"/register"}
                data-hover="false">
                Sign Up
              </Button>
            </NavbarItem>
          </div>
        )}
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <div>
            {userLoggedIn ? (
              <Link
                className="text-lg text-gray-700 font-raleway font-semiBold hover:text-gray-800 hover:opacity-100"
                href="#"
                onPress={() => {
                  setIsMenuOpen();
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                }}>
                Logout
              </Link>
            ) : (
              <Link
                className="text-lg text-gray-700 font-raleway font-semiBold hover:text-gray-800 hover:opacity-100"
                href="/login">
                Login
              </Link>
            )}
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
