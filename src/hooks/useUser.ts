import { useMutation } from "@tanstack/react-query";
import { createUser, login, logout } from "../firebaseApp";

export function useUser() {
  const newUser = useMutation({
    mutationFn: (user: { email: string; password: string }) => createUser(user),
  });

  const loginUser = useMutation({
    mutationFn: (user: { email: string; password: string }) => login(user),
  });

  const logoutUser = useMutation({
    mutationFn: logout,
  });

  return { newUser, loginUser, logoutUser };
}
