'use client';

import {NavLink} from '@remix-run/react';
import NextImage from 'next/image';

import {useLocation} from 'react-router-dom';

export default function NavItem({
  item,
  primaryDomainUrl,
  publicStoreDomain,
  closeAside,
}: {
  item: any;
  primaryDomainUrl: any;
  publicStoreDomain: any;
  closeAside: any;
}) {
  // if the url is internal, we strip the domain
  let url =
    item.url.includes('myshopify.com') ||
    item.url.includes(publicStoreDomain) ||
    item.url.includes(primaryDomainUrl)
      ? new URL(item.url).pathname
      : item.url;

  let isActive = false;
  const location = useLocation();
  if (location.pathname === url) {
    isActive = true;
  }

  return (
    <div className="relative group">
      <NavLink
        className="header-menu-item relative text-md uppercase w-20 xl:w-28 lg:flex lg:items-center lg:justify-center"
        end
        key={item.id}
        onClick={closeAside}
        prefetch="intent"
        style={activeLinkStyle}
        to={url}
      >
        <span className=" relative text-center w-40 no-underline hover:no-underline group-hover:text-white z-20">
          {item.title}
        </span>
      </NavLink>

      {isActive && (
        <img
          src={`/images/navbar/${item.title.toLowerCase()}.png`}
          alt="Active background"
          className="group-hover:invisible group-hover:opacity-0 visible opacity-100 z-0 absolute scale-[1.75] h-auto w-full  left-1/2 top-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      )}

      <img
        src={`/images/navbar/${item.title.toLowerCase()}-expanded.png`}
        alt="Decorative background"
        className="z-0 absolute lg:scale-[2.7]  xl:scale-[2] h-auto w-full invisible opacity-0 group-hover:visible group-hover:opacity-100 left-1/2 top-2 lg:top-9 xl:top-2 -translate-x-1/2 translate-y-1/4"
      />
      {item.items.length > 0 ? (
        <div className="font-title absolute invisible w-32 opacity-0 group-hover:visible group-hover:opacity-100 flex flex-col left-1/2 -translate-x-1/2 top-10">
          {item.items.map((subItem: any) => {
            let subItemUrl =
              item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain) ||
              item.url.includes(primaryDomainUrl)
                ? new URL(subItem.url).pathname
                : subItem.url;

            if (subItem.title.toLowerCase() == 'mission') {
              subItemUrl = 'pages/mission#mission';
            } else if (subItem.title.toLowerCase() == 'opportunities') {
              subItemUrl = 'pages/team#oppportunities';
            }
            console.log(subItemUrl);
            return (
              <NavLink
                className="relative"
                end
                key={subItem.id}
                onClick={closeAside}
                prefetch="intent"
                style={activeLinkStyle}
                to={subItemUrl || '/'}
              >
                <span className="text-light-text lowercase font-semibold hover:underline">
                  {subItem.title}
                </span>
              </NavLink>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    color: isActive ? 'white' : 'black',
  };
}
