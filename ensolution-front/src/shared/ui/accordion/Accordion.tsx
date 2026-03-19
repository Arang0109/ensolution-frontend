import { Accordion as AccordionMaterial, AccordionHeader, AccordionBody } from "@material-tailwind/react";

import { AccordionIcon } from "./AccordionIcon";

interface AccordionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const Accordion = ({
  title,
  open,
  onToggle,
  children,
}: AccordionProps) => {
  return (
    <AccordionMaterial open={open} icon={<AccordionIcon open={open} />}>
      <AccordionHeader onClick={onToggle} className="text-sm md:text-lg">
        {title}
      </AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </AccordionMaterial>
  );
};