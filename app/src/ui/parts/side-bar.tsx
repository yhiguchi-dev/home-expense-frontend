import React, { ComponentType, PropsWithChildren, ReactElement } from "react";

import style from "@/ui/parts/side-bar.module.css";

interface Attribute {
  title: string;
  path: string;
}

interface Props {
  linkComponent: ComponentType<PropsWithChildren<{ href: string }>>;
  attributes: Attribute[];
}

const SideBar = ({
  linkComponent: LinkComponent,
  attributes,
}: Props): ReactElement => {
  const mapped = attributes.map((value, index) => {
    const { title, path } = value;
    return (
      <li key={index}>
        <LinkComponent href={path}>{title}</LinkComponent>
      </li>
    );
  });
  return <ul className={style.sideBar}>{mapped}</ul>;
};
export default SideBar;
