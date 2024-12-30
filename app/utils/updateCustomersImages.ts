import { stripeInstance } from "./stripeInstance";
/**
 * Updates the customer's metadata by adding a new image URL to their `ogImages` array.
 *
 * @param {string} customerId - The unique identifier of the customer to update.
 * @param {string} imgUrl - The URL of the image to add to the customer's metadata.
 * @throws {Error} If the customer ID is not provided, or if the customer is deleted, or if any Stripe-related errors occur.
 * @returns {Promise<void>} A promise that resolves once the customer's metadata has been updated.
 */

export async function updateCustomersImages(
  customerId: string,
  imgUrl: string
) {
  if (!customerId)
    throw new Error("There is no customer ID, provide email again");
  //get users images from metadata
  const customer = await stripeInstance.customers.retrieve(customerId);
  //type guard

  if (customer.deleted) throw new Error("Customer is deleted");
  //get actual array with images, if it doesnt exist return empty arr
  const ogImagesArr: string[] = JSON.parse(
    (customer.metadata.ogImages as string) ?? "[]"
  );
  ogImagesArr.push(imgUrl);

  await stripeInstance.customers.update(customerId, {
    metadata: {
      ogImages: JSON.stringify(ogImagesArr),
    },
  });
}