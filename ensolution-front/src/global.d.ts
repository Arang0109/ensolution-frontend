import type { ReactNode } from "react";

type MTFixProps = {
  children?: ReactNode;
  placeholder?: string;
  onResize?: (...args: unknown[]) => void;
  onResizeCapture?: (...args: unknown[]) => void;
  onPointerEnterCapture?: (...args: unknown[]) => void;
  onPointerLeaveCapture?: (...args: unknown[]) => void;
};

declare module "@material-tailwind/react" {
  interface RadioProps extends MTFixProps {}
  interface CardProps extends MTFixProps {}
  interface TypographyProps extends MTFixProps {}
  interface ListProps extends MTFixProps {}
  interface ListItemProps extends MTFixProps {}
  interface ListItemPrefixProps extends MTFixProps {}
  interface ListItemSuffixProps extends MTFixProps {}
  interface ChipProps extends MTFixProps {}
  interface AccordionProps extends MTFixProps {}
  interface AccordionHeaderProps extends MTFixProps {}
  interface AccordionBodyProps extends MTFixProps {}
  interface ButtonProps extends MTFixProps {}
  interface InputProps extends MTFixProps {}
  interface SelectProps extends MTFixProps {}
  interface OptionProps extends MTFixProps {}
  interface MenuProps extends MTFixProps {}
  interface MenuHandlerProps extends MTFixProps {}
  interface MenuListProps extends MTFixProps {}
  interface MenuItemProps extends MTFixProps {}
  interface DialogProps extends MTFixProps {}
  interface DialogHeaderProps extends MTFixProps {}
  interface DialogBodyProps extends MTFixProps {}
  interface DialogFooterProps extends MTFixProps {}
  interface NavbarProps extends MTFixProps {}
  interface TabsProps extends MTFixProps {}
  interface TabsHeaderProps extends MTFixProps {}
  interface TabsBodyProps extends MTFixProps {}
  interface TabProps extends MTFixProps {}
  interface TabPanelProps extends MTFixProps {}
  interface CardHeaderProps extends MTFixProps {}
  interface CardBodyProps extends MTFixProps {}
  interface CardFooterProps extends MTFixProps {}
  interface AvatarProps extends MTFixProps {}
  interface BadgeProps extends MTFixProps {}
  interface IconButtonProps extends MTFixProps {}
  interface TextareaProps extends MTFixProps {}
  interface CheckboxProps extends MTFixProps {}
  interface RadioProps extends MTFixProps {}
  interface SwitchProps extends MTFixProps {}
  interface SpinnerProps extends MTFixProps {}
  interface TooltipProps extends MTFixProps {}
  interface PopoverProps extends MTFixProps {}
  interface PopoverHandlerProps extends MTFixProps {}
  interface PopoverContentProps extends MTFixProps {}
  interface BreadcrumbsProps extends MTFixProps {}
  interface ProgressProps extends MTFixProps {}
  interface SliderProps extends MTFixProps {}
  interface RatingProps extends MTFixProps {}
  interface TimelineProps extends MTFixProps {}
  interface TimelineItemProps extends MTFixProps {}
  interface TimelineConnectorProps extends MTFixProps {}
  interface TimelineIconProps extends MTFixProps {}
  interface TimelineBodyProps extends MTFixProps {}
  interface TimelineHeaderProps extends MTFixProps {}
  interface AlertProps extends MTFixProps {}
  interface CollapseProps extends MTFixProps {}
  interface DrawerProps extends MTFixProps {}
  interface FooterProps extends MTFixProps {}
  interface StepperProps extends MTFixProps {}
  interface StepProps extends MTFixProps {}
  interface SpeedDialProps extends MTFixProps {}
  interface SpeedDialHandlerProps extends MTFixProps {}
  interface SpeedDialContentProps extends MTFixProps {}
  interface SpeedDialActionProps extends MTFixProps {}
}
