# Project Overview
   The project is a coloring pages ai generator for kids.
You have to provide the prompt, generate the image then you will be able to buy it.

Link to deployed app: www.koloruj.art

## Dependencies

The project utilizes the following dependencies:

### Core Dependencies
- **Next.js** (`next`): ^15.0.3 - A React framework for server-side rendering and static website generation.
- **Typescript** 

### UI and Styling
- **Material UI** (`@mui/material`): ^6.1.7 - Components and tools for building React user interfaces.
- **Material Icons** (`@mui/icons-material`): ^6.1.7 - A library of Google Material Design icons for React.
- 
### Form Handling and Validation
- **React Hook Form** (`react-hook-form`): ^7.54.1 - Lightweight form library for React.
- **Yup** (`yup`): ^1.6.1 - Schema-based validation.

### Payment Processing
- **Stripe** (`stripe`): ^17.4.0 - Node.js library for the Stripe API.

### Image Processing
- **Sharp** (`sharp`): ^0.33.5 - High-performance image processing library.

### AI Integration
- **Replicate** (`replicate`): ^1.0.1 - A library for interacting with the Replicate API.

## Workflow

1. **Email Input**
   - The user provides their email, which is used to create a Stripe customer.
2. **Image Generation**
   - Images are blurred on the server side, encoded in Base64, and sent to the client to be stored in `localStorage`.
3. **Customer Metadata**
   - The original image URL from Replicate is assigned to the customer metadata for future use.
4. **Image Deletion**
   - If a user deletes an image, the `localStorage` is updated accordingly.
5. **Checkout Page**
   - The checkout page displays blurred images that the user is purchasing.
6. **Success Page**
   - The success page shows purchased items with download button.

## Things to Improve

1. **Internalization**
   - Add multi-language support.
2. **Cloudflare for Email Input**
   - Integrate Cloudflare to improve security and validation of email input.
3. **Feature: Connecting Dots to Create Image**
   - Implement a feature that allows users to connect dots to draw an image.
4. **LocalStorage Image Management**
   - Ensure images are managed independently of the email and stored in `localStorage`.
5. **Disable "Open Image in New Tab"**
   - Prevent users from opening blurred images in a new tab.
6. **Restrict Image Deletion**
   - Set a maximum limit for deletions before requiring a purchase.
7. **Disable Image Opening in New Card**
   - Restrict users from opening images in a new card.
8. **Add English Translation to Input Fields**
   - Provide English translations for input query.
9. **Image Generation Loader**
    - Display a spinning loading circle on an image tile while generating the image.

---
## Screenshots
###Home
![image](https://github.com/user-attachments/assets/f3bfc0f6-ed76-4e8d-9394-d0188e86938e)
###Dashboard
![image](https://github.com/user-attachments/assets/72814a06-cba4-49f2-841a-759d5b31bf00)
###Generated Images
![image](https://github.com/user-attachments/assets/1f9e11aa-b0f4-4e70-88ef-45a63c635104)
###Checkout Page
![image](https://github.com/user-attachments/assets/d2c760b2-549f-4cff-8a80-60ce046e8fb9)
###Failed payment case
![image](https://github.com/user-attachments/assets/5e2fd753-92d5-4819-847e-694c901ef443)
###Success payment case
![image](https://github.com/user-attachments/assets/02931c4f-1c80-433d-98fe-8cfc44ba4051)
