import type { ReactNode } from "react";
import { Link } from "react-router-dom";

// Any href pointing at another origin (e.g. a hosted project demo) needs a
// plain <a> so it opens correctly instead of being treated as an in-app route.
export const isExternalHref = (href: string) => /^https?:\/\//.test(href);

interface MenuLinkProps {
  href: string;
  onClick: () => void;
  className?: string;
  role?: string;
  children: ReactNode;
}

// Renders a React Router <Link> for internal routes, or a plain <a> (opened
// in a new tab) for external URLs. Used by MegaMenu and MobileMegaAccordion
// so both stay in sync on how external demo links behave.
export default function MenuLink({ href, onClick, className, role, children }: MenuLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} onClick={onClick} role={role} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} onClick={onClick} role={role} className={className}>
      {children}
    </Link>
  );
}