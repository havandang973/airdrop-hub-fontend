// 'use client';
// import { useLogout } from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";

// export default function LogoutButton() {
//   const logout = useLogout();
//   const router = useRouter();

//   const handleLogout = () => {
//     logout.mutate(undefined, {
//       onSuccess: () => router.push("/login"),
//     });
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="text-red-600 hover:underline"
//       disabled={logout.isPending}
//     >
//       Logout
//     </button>
//   );
// }
