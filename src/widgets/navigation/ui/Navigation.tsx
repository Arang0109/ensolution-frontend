import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { NavList } from "./NavList";
import { useAuth } from "@app/providers/auth";

export function Navigation() {
  const [openNav, setOpenNav] = React.useState(false);
  const { logout, isAuthenticated } = useAuth();
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/dashboard"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Ensolution
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          {isAuthenticated ? (
            <Button variant="outlined" size="sm" onClick={logout}>
              Log Out
            </Button>
          ) : (
            <Button variant="outlined" size="sm">
              Log In
            </Button>
          )}
        </div>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {isAuthenticated ? (
            <Button variant="outlined" size="sm" fullWidth onClick={logout}>
              Log Out
            </Button>
          ) : (
            <Button variant="outlined" size="sm" fullWidth>
              Log In
            </Button>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}