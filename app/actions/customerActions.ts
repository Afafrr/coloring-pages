type manageCus = Promise<
  | {
      customer: string;
      error?: undefined;
    }
  | {
      customer?: undefined;
      error: unknown;
    }
>;

export async function manageCustomer(email: string): manageCus {
  try {
    const response = await fetch("api/customer", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const { customer, error } = await response.json();
    if (error) {
      console.error(error);
      throw new Error(error.code);
    }
    return { customer };
  } catch (error) {
    return { error };
  }
}
