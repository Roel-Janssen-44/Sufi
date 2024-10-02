'use server';

const CREATE_CUSTOMER_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        email
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

export async function signupToNewsletter(email: string) {
  const input = {
    email: email,
    password: generatePassword(),
    acceptsMarketing: true,
  };

  const response = await fetch(
    `https://sufi-com.myshopify.com/api/2024-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Todo - replace with own storefront access token
        'X-Shopify-Storefront-Access-Token': '52043fd52760a774b6707eeb621a3027',
      },
      body: JSON.stringify({
        query: CREATE_CUSTOMER_MUTATION,
        variables: {input},
      }),
    },
  );

  const data = await response.json();
}

function generatePassword(length = 12) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}
