import { cookies } from "next/headers";

export const getUsers = async () => {
  const cookieStore = cookies();
  return cookieStore.getAll();
};
