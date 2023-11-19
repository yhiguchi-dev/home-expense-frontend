import {LinkProps} from "next/dist/client/link";
import Link from "next/link";
import React, {AnchorHTMLAttributes, ReactElement} from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

const LinkComponent = ({ children, ...props }: Props): ReactElement => {
        return <Link {...props}>{children}</Link>;
    };
export default LinkComponent;