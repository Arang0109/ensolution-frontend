import { List } from "@material-tailwind/react";
import { NavListMenu } from "./NavListMenu";

export function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      <NavListMenu />
    </List>
  );
}