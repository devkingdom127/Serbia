import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

interface LinkProps {
    className?: string;
    style?: any;
    href?: any;
    id?: any
}

const ALink: React.FC<LinkProps> = ({
    children,
    className,
    style,
    href,
    id,
    ...props
  }) => {

    if ( typeof href === 'object' ) {
        if ( !href.pathname ) {
            href.pathname = useRouter().pathname;
        }
    }

    return (
        <>
            { href !== '#' ?
                <Link href={ href } { ...props } scroll={ false }>
                    <a className={ className }  id={ id }  style={ style }>
                        { children }
                    </a>
                </Link>
                : <a className={ className } href="#" onClick={ e => e.preventDefault() }>{ children }</a>
            }
        </>
    )
}

export default ALink;