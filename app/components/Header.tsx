import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import {type CartViewPayload, useAnalytics} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

import {Image} from '@shopify/hydrogen';
import NextImage from 'next/image';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="header justify-between">
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <img src="/images/logo.png" className="w-20 -mt-2" alt="Logo Sufi" />
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;

  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }
  return (
    <nav
      className={`${className} flex-row gap-8 mt-3 hidden lg:flex xl:gap-20`}
      role="navigation"
    >
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        console.log('item.url', item);

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item group relative text-md uppercase"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
            {/* <img
              src={`/images/navbar/${item.title.toLowerCase()}.png`}
              alt="Decorative background"
              className="visible opacity-100 group-hover:invisible group-hover:opacity-0 w-32"
            />
            <img
              src={`/images/navbar/${item.title.toLowerCase()}-expanded.png`}
              alt="Decorative background"
              className="absolute h-auto w-full scale-125 invisible opacity-0 group-hover:visible group-hover:opacity-100 left-0 top-14"
            /> */}
            {item.items.length > 0 ? (
              <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 flex flex-col left-1/2 -translate-x-1/2 top-24">
                {item.items.map((subItem) => {
                  return (
                    <NavLink
                      className="relative"
                      end
                      key={subItem.id}
                      onClick={closeAside}
                      prefetch="intent"
                      style={activeLinkStyle}
                      to={subItem.url || '/'}
                    >
                      <span className="text-light-text">{subItem.title}</span>
                    </NavLink>
                  );
                })}
              </div>
            ) : null}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <div className="block lg:hidden">
        <HeaderMenuMobileToggle />
      </div>

      {/* <NavLink
        className="header-menu-item"
        end
        key={item.id}
        onClick={closeAside}
        prefetch="intent"
        style={activeLinkStyle}
        to={url}
      > */}
      <SearchToggle />

      <div className="w-12 sm:w-16 sm:h-16 h-12 group relative cursor-pointer">
        <img
          src="/images/calendar.png"
          className="p-0 w-full h-full -ml-[2px] scale-80 visible opacity-100 group-hover:opacity-0 group-hover:invisible"
        />
        <img
          src="/images/calendar-hover.png"
          className="absolute left-0 top-0 invisible opacity-0 group-hover:opacity-100 group-hover:visible"
        />
      </div>
      {/* </NavLink> */}
      {/* <NavLink
        className="header-menu-item"
        end
        key={item.id}
        onClick={closeAside}
        prefetch="intent"
        style={activeLinkStyle}y
        to={url}
      > */}
      <div className="w-12 sm:w-16 sm:h-16 h-12 group relative cursor-pointer">
        <img
          src="/images/shop.png"
          className="p-0 w-full h-full visible opacity-100 group-hover:opacity-0 group-hover:invisible"
        />
        <img
          src="/images/shop-hover.png"
          className="absolute left-0 top-0 invisible opacity-0 group-hover:opacity-100 group-hover:visible"
        />
      </div>

      {/* </NavLink> */}
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset w-10 h-10"
      onClick={() => open('mobile')}
    >
      <h3 className="text-primary-orange cursor-pointer text-3xl">☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      className="reset w-12 sm:w-16 sm:h-16 h-12 group relative cursor-pointer"
      onClick={() => open('search')}
    >
      <img
        src="/images/search.png"
        className="p-0 w-full h-full visible opacity-100 group-hover:opacity-0 group-hover:invisible"
      />
      <img
        src="/images/search-hover.png"
        className="absolute left-0 top-0 invisible opacity-0 group-hover:opacity-100 group-hover:visible"
      />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      className="w-12 sm:w-16 sm:h-16 h-12 group relative cursor-pointer"
    >
      <img
        src="/images/basket.png"
        className="p-0 w-full h-full visible opacity-100 group-hover:opacity-0 group-hover:invisible"
      />
      <img
        src="/images/basket-hover-empty.png"
        className="absolute left-[6px] top-[3px] invisible opacity-0 group-hover:opacity-100 group-hover:visible"
      />
      {/* Todo - add product counter */}
      {/* {count === null ? null : count} */}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
