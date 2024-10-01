'use server';

const CREATE_CUSTOMER_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export async function signupToNewsletter() {
  const input = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'johnsmith@shopify.com',
    phone: '+15146669999',
    password: '5hopify',
    acceptsMarketing: true,
  };

  const response = await fetch(
    `https://sufi-com.myshopify.com/api/2024-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Todo - replace with your own storefront access token
        'X-Shopify-Storefront-Access-Token': '',
      },
      body: JSON.stringify({
        query: CREATE_CUSTOMER_MUTATION,
        variables: {input},
      }),
    },
  );

  const data = await response.json();
  console.log(data);
}
