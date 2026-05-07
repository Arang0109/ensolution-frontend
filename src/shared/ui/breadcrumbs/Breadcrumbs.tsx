import { Breadcrumbs as BreadcrumbsMaterial } from "@material-tailwind/react";

interface BreadcrumbsProps {
  contents: {
    title: string;
    path: string;
  }[]
}

export const Breadcrumbs = ({
  contents
}: BreadcrumbsProps) => {
  return (
    <>
      <BreadcrumbsMaterial>
        {contents.map((item, index) => {
          return (
            <a key={index} href={item.path} className="text-xs md:text-sm opacity-60">
              {item.title}
            </a>
          )
        })}
      </BreadcrumbsMaterial>
    </>
  );
}