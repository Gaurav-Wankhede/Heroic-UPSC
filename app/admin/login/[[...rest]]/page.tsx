"use client"
import { SignIn } from "@clerk/nextjs";

export default function AdminLogin() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "p-8 rounded-lg shadow-lg",
            headerTitle: "text-2xl font-bold mb-4 text-center",
            headerSubtitle: "hidden",
            socialButtonsBlockButton: "hidden",
            dividerRow: "hidden",
            formFieldInput: "w-full p-2 border rounded mb-4",
            formButtonPrimary: "w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600",
            footerAction: "hidden"
          }
        }}
        redirectUrl="/dashboard"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
}
