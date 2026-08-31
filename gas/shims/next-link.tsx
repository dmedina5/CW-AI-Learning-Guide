/**
 * Drop-in replacement for `next/link` in the Apps Script build.
 *
 * The 27 page files import Link exactly as they do for the GitHub Pages build.
 * Vite aliases `next/link` here, so none of those files need to change.
 */
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { navigate, toHash } from '../src/router';

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children?: ReactNode;
  replace?: boolean;
  prefetch?: boolean;
  scroll?: boolean;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, replace, prefetch: _prefetch, scroll: _scroll, onClick, ...rest },
  ref
) {
  const external = /^(https?:|mailto:|tel:)/.test(href);

  return (
    <a
      ref={ref}
      href={external ? href : toHash(href)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (external || e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href, { replace });
      }}
      {...rest}
    >
      {children}
    </a>
  );
});

export default Link;
