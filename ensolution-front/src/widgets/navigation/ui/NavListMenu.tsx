import React from "react";

import { MENU_ITEMS, type MenuItem as MenuItemType } from "@widgets/navigation/model/menuItems";
import {
  Collapse,
  Typography,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

function NestedMenu({ item }: { item: MenuItemType }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  if (!item.children) return null;

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <MenuItem className="flex items-center justify-between">
            {item.label}
            <ChevronUpIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform ${
                isMenuOpen ? "rotate-90" : ""
              }`}
            />
          </MenuItem>
        </MenuHandler>

        <MenuList className="rounded-xl">
          {item.children.map((children) => (
            <a href={children.path} key={children.key}>
              <MenuItem>{children.label}</MenuItem>
            </a>
          ))}
        </MenuList>
      </Menu>
    </React.Fragment>
  )
}

export function NavListMenu() {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [openMobile, setOpenMobile] = React.useState<string | null>(null);

  return (
    <>
      {MENU_ITEMS.map((menu) => {
        const isOpen = openMenu === menu.key;
        const isMobileOpen = openMobile === menu.key;

        // ============================
        // children 없는 경우 (단일 링크)
        // ============================
        if (!menu.children) {
          return (
            <Typography
              as="a"
              href={menu.path ?? "#"}
              key={menu.key}
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                {menu.label}
              </ListItem>
            </Typography>
          );
        }

        // ============================
        // children 있는 경우 (Dropdown)
        // ============================
        return (
          <Menu
            key={menu.key}
            open={isOpen}
            handler={(val) => setOpenMenu(val ? menu.key : null)}
            allowHover
            placement="bottom"
          >
            {/* ====== Desktop ====== */}
            <MenuHandler>
              <Typography as="div" variant="small" className="font-medium">
                <ListItem
                  className="flex items-center gap-2 py-2 pr-4"
                  selected={isOpen || isMobileOpen}
                  onClick={() =>
                    setOpenMobile((prev) =>
                      prev === menu.key ? null : menu.key
                    )
                  }
                >
                  {menu.label}
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`hidden h-3 w-3 transition-transform lg:block ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`block h-3 w-3 transition-transform lg:hidden ${
                      isMobileOpen ? "rotate-180" : ""
                    }`}
                  />
                </ListItem>
              </Typography>
            </MenuHandler>

            {/* ====== Desktop Dropdown ====== */}
            <MenuList className="hidden rounded-xl lg:block">
              {menu.children.map((child) =>
                child.children ? (
                  <NestedMenu key={child.key} item={child} />
                ) : (
                  <a href={child.path ?? "#"} key={child.key}>
                    <MenuItem>{child.label}</MenuItem>
                  </a>
                )
              )}
            </MenuList>

            {/* ====== Mobile ====== */}
            <div className="block lg:hidden">
              <Collapse open={isMobileOpen}>
                {menu.children.map((child) =>
                  child.children ? (
                    <NestedMenu key={child.key} item={child} />
                  ) : (
                    <a href={child.path ?? "#"} key={child.key}>
                      <MenuItem>{child.label}</MenuItem>
                    </a>
                  )
                )}
              </Collapse>
            </div>
          </Menu>
        );
      })}
    </>
  );
}