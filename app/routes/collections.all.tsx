import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {getPaginationVariables, Image, Money} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `Sufi | Products`}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const [{products}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {...paginationVariables},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);
  return {products};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  return {};
}

export default function Collection() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="collection container mx-auto">
      <PaginatedResourceSection
        connection={products}
        resourcesClassName="products-grid mt-10"
      >
        {({node: product, index}) => (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        )}
      </PaginatedResourceSection>
    </div>
  );
}

function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link
      className="product-item relative group"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {product.featuredImage && (
        <div className="relative w-full h-auto overflow-hidden">
          <Image
            alt={product.featuredImage.altText || product.title}
            className="group-hover:scale-105 transition-transform duration-300"
            // aspectRatio="1/1"
            data={product.featuredImage}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        </div>
      )}

      <h4 className="font-main font-semibold w-full text-center absolute left-0 bottom-24 text-white">
        {product.title}
      </h4>
      <div
        className={`text-center mt-4 flex flex-row justify-center gap-2 ${
          product.totalInventory == undefined
            ? ''
            : product.totalInventory > 0
            ? 'text-primary-green'
            : 'text-sold-out'
        }`}
      >
        {product.compareAtPriceRange.minVariantPrice.amount !== '0.0' && (
          <div className="flex flex-row">
            <span className="line-through mr-1">
              <Money
                withoutTrailingZeros
                data={product.priceRange.minVariantPrice}
              />
            </span>
            <span className="text-sale">
              <Money
                withoutTrailingZeros
                data={product.compareAtPriceRange.minVariantPrice}
              />
            </span>
          </div>
        )}
        {product.compareAtPriceRange.minVariantPrice.amount == '0.0' && (
          <Money
            withoutTrailingZeros
            data={product.priceRange.minVariantPrice}
          />
        )}
        {product.totalInventory !== undefined &&
          product.totalInventory !== null && (
            <>
              {product.totalInventory == 0 && (
                <>
                  <span>-</span>
                  <span>SOLD OUT</span>
                  <Link
                    // Todo - Add notify me link
                    to="/"
                    className="absolute right-4 sm:right-8 top-4 sm:top-8 w-32 h-auto"
                  >
                    <img
                      src="/images/notify-me.png"
                      className="w-full h-auto"
                    />
                  </Link>
                </>
              )}
            </>
          )}
        {product.totalInventory !== undefined &&
          product.totalInventory !== null && (
            <>
              {product.totalInventory !== 0 &&
                product.compareAtPriceRange.minVariantPrice.amount !==
                  '0.0' && (
                  <>
                    {/* Sale check */}
                    <div className="absolute right-4 sm:right-8 top-4 sm:top-8 w-36 h-auto">
                      <img src="/images/sale.png" className="w-full h-auto" />
                    </div>
                  </>
                )}
            </>
          )}
      </div>
    </Link>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    totalInventory
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    compareAtPriceRange {
      maxVariantPrice {
        ...MoneyProductItem
      }
      minVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2024-01/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_ITEM_FRAGMENT}
` as const;
