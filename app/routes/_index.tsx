import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
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
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home overflow-x-hidden">
      <div className="flex gap-4 flex-row flex-wrap justify-center sm:gap-x-10 lg:hidden xl:hidden xl:grid-cols-5 mt-20 2xl:max-w-[1300px] 2xl:mx-auto">
        <HomeElement index={3} name="wild-flowers" classes="xl:ml-20" />
        <HomeElement
          index={9}
          name="events"
          classes="-mt-18 xl:ml-16 xl:mt-0"
        />
        <HomeElement
          index={6}
          name="methods"
          classes="xl:mb-0 xl:col-span-2 xl:w-[350px] xl:ml-10 2xl:mt-20"
        />
        <HomeElement
          index={8}
          name="linden"
          classes="lg:mt-20 xl:mt-0 xl:-ml-28"
        />
        <HomeElement index={7} name="willow" classes="xl:mb-0 xl:ml-10" />
        <HomeElement index={1} name="shop" classes="sm:mt-20 xl:mt-0 xl:ml-5" />
        <HomeElement index={4} name="about" classes="-mt-10 sm:mt-10 md:mt-0" />
        <HomeElement index={2} name="wool" classes="xl:mr-5 md:mb-0" />
        <HomeElement index={5} name="workshops" classes="xl:mr-10" />
      </div>
      <div className="hidden lg:flex gap-4 flex-row flex-wrap justify-center sm:gap-x-10 xl:grid xl:grid-cols-5 mt-20 2xl:max-w-[1300px] 2xl:mx-auto">
        <HomeElement index={1} name="wild-flowers" classes="xl:ml-20" />
        <HomeElement
          index={2}
          name="events"
          classes="-mt-32 xl:ml-16 xl:mt-0"
        />
        <HomeElement
          index={3}
          name="methods"
          classes="mb-10 mb-0 xl:mb-0 xl:col-span-2 xl:w-[350px] xl:ml-10 2xl:mt-20"
        />
        <HomeElement
          index={4}
          name="linden"
          classes="lg:mt-20 xl:mt-0 xl:-ml-28"
        />
        <HomeElement
          index={5}
          name="willow"
          classes="mb-6 mb-0 xl:mb-0 xl:ml-10"
        />
        <HomeElement index={6} name="shop" classes="sm:mt-20 xl:mt-0 xl:ml-5" />
        <HomeElement index={7} name="about" classes="-mt-10 sm:mt-10 md:mt-0" />
        <HomeElement
          index={8}
          name="wool"
          classes="mb-6 mb-0 xl:mr-5 md:mb-0"
        />
        <HomeElement index={9} name="workshops" classes="xl:mr-10" />
      </div>
      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
    </div>
  );
}

function HomeElement({
  name,
  classes,
  index,
}: {
  name: string;
  classes?: string;
  index: number;
}) {
  return (
    <Link
      style={{order: index}} // Add inline style to dynamically set the order
      to={`/${name}`}
      className={`group lg:order-none w-80 sm:w-72 relative xl:w-64 md:flex md:justify-center md:items-center xl:block ${classes}`}
    >
      <img
        src={`/images/homepage/${name}.png`}
        alt={`${name}`}
        className="w-full h-auto group-hover:invisible transition-all opacity-100 group-hover:opacity-0"
      />
      <img
        src={`/images/homepage/${name}-cutout.png`}
        alt={`${name} with cutout`}
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all absolute left-0 top-0 w-full h-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 xl:top-0 xl:left-0 xl:translate-x-0 xl:translate-y-0"
      />
    </Link>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
