# Project Overview
The project is a coloring pages ai generator for kids.
You have to provide the prompt, generate the image then you will be able to buy it

## Dependencies

The project utilizes the following dependencies:

### Core Dependencies
- **Next.js** (`next`): ^15.0.3 - A React framework for server-side rendering and static website generation.
- **Typescript** 

### UI and Styling
- **Material UI** (`@mui/material`): ^6.1.7 - Components and tools for building React user interfaces.
- **Material Icons** (`@mui/icons-material`): ^6.1.7 - A library of Google Material Design icons for React.
- **Emotion** (`@emotion/react`, `@emotion/styled`): ^11.13.x - CSS-in-JS library for styling components.

### Form Handling and Validation
- **React Hook Form** (`react-hook-form`): ^7.54.1 - Lightweight form library for React.
- **Yup** (`yup`): ^1.6.1 - Schema-based validation.
- **@hookform/resolvers**: ^3.9.1 - Integration between Yup and React Hook Form.

### Payment Processing
- **Stripe.js** (`@stripe/stripe-js`): ^5.4.0 - JavaScript library for Stripe integration.
- **React Stripe.js** (`@stripe/react-stripe-js`): ^3.1.1 - React bindings for Stripe.js.
- **Stripe** (`stripe`): ^17.4.0 - Node.js library for the Stripe API.

### Image Processing
- **Sharp** (`sharp`): ^0.33.5 - High-performance image processing library.

### AI Integration
- **Replicate** (`replicate`): ^1.0.1 - A library for interacting with the Replicate API.

### Miscellaneous
- **Next Client Cookies** (`next-client-cookies`): ^2.0.0 - Utility for handling cookies in Next.js.

## Workflow

1. **Email Input**
   - The user provides their email, which is used to create a Stripe customer.
2. **Image Generation**
   - Images are blurred on the server side, encoded in Base64, and sent to the client to be stored in `localStorage`.
3. **Customer Metadata**
   - The original image URL from Replicate is assigned to the customer metadata in the format `key=id : value=image_url` for future use.
4. **Image Deletion**
   - If a user deletes an image, the `localStorage` is updated accordingly.
5. **Checkout Page**
   - The checkout page displays blurred images that the user is purchasing.
6. **Webhook Integration**
   - After a successful payment, a webhook updates the customer's metadata with `purchased:true` to unlock the content on the success page.
7. **Success Page**
   - The success page sends a request to an endpoint to verify the purchase status and deliver the images to the user.

## Things to Improve

1. **Internalization**
   - Add multi-language support.
2. **Cloudflare for Email Input**
   - Integrate Cloudflare for improved security and validation of email input.
3. **Feature: Connecting Dots to Create Image**
   - Implement a feature that allows users to connect dots to generate an image.
4. **LocalStorage Image Management**
   - Ensure images are managed independently of the email and stored in `localStorage`.
5. **Disable "Open Image in New Tab"**
   - Prevent users from opening blurred images in a new tab.
6. **Restrict Image Deletion**
   - Set a maximum limit for deletions before requiring a purchase.
7. **Modal Confirmation for Deletion**
   - Add a modal confirmation when deleting a product.
8. **Disable Image Opening in New Card**
   - Restrict users from opening images in a new card.
9. **Add English Translation to Input Fields**
   - Provide English translations for all input fields.
10. **Image Generation Loader**
    - Display a spinning loading circle on an image tile while generating the image.

---

Feel free to modify and extend this README as the project evolves. If you encounter issues or have suggestions, please contribute or contact the maintainers.
