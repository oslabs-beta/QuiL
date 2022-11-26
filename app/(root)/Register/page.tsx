"use client";
import Register from "./Register";
import { useRouter } from "next/navigation";

// const handleEmail = () => {
//   console.log(e.target.value, ' inside handle email');
// };

// const handleUsername = () => {
//   console.log(e.target.value, ' inside handle username');
// };

// const handlePassword = () => {
//   console.log(e.target.value, ' inside handle password');
// };

// const handleSubmit = () => {
//   console.log(e.target.value, ' handle the submit');
// };

export default function Page() {
//   const router = useRouter();
//   router.prefetch(`/Main/Chart?URI=${uriParam}`)

  return (
    <div>
      <Register/>
    </div>
  );
}