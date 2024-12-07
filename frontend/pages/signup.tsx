import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

import * as React from "react";
import { LoadingCircle } from "@/components/LoadingCircle";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { status } = useSession({ required: false });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  return (
    <div>
      <div className="flex h-screen">
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-semibold mb-6 font-inter">
            Welcome to Avenir
          </h1>
          <form className="w-full max-w-md">
            <div className="mb-4 w-full">
              <Button
                className="flex items-center justify-center w-full text-slate-900 hover:bg-slate-900 hover:text-white border border-slate-900 rounded-[6px] h-[40px] bg-transparent"
                onClick={() => signIn("google")}
                type="button"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                  className="w-6 h-6"
                />
                Sign up with Google
              </Button>
            </div>
            <div className="mb-4 w-full">
              <Button className="flex gh-btn items-center justify-center w-full text-slate-900 hover:bg-slate-900 hover:text-white border border-slate-900 rounded-[6px] h-[40px] bg-transparent">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png"
                  className="w-6 h-6 transition-colors duration-200"
                  type="button"
                />
                Sign up with GitHub
              </Button>
            </div>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">
                OR
              </span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-inter font-medium text-gray-700 text-left"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex mb-4 space-x-8">
              <div className="w-1/2">
                <label
                  className="block text-sm font-inter font-medium text-gray-700 text-left"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-sm font-inter font-medium text-gray-700 text-left"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-inter font-medium text-gray-700 text-left"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="password"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button
                className="flex items-center justify-center w-full border-[6px] text-white border-slate-900 hover:border-slate-800 hover:bg-slate-800 rounded-md bg-slate-900"
                type="button"
                onClick={() => {
                  setProcessing(true);
                  // Handle sign up logic here
                }}
              >
                {processing ? <LoadingCircle /> : "Create Account"}
              </Button>
            </div>
            <div className="mt-4 text-center font-inter text-[14px] font-medium">
              <span className="text-slate-900">Already have an account? </span>
              <a href="/login" className="text-slate-900 underline">
                Log in
              </a>
            </div>
          </form>
        </div>
        <div className="w-1/2 relative">
          <img
            src="https://images7.alphacoders.com/898/898714.jpg"
            className="object-cover h-full w-full rounded-l-[10px]"
          />
          <div className="absolute top-0 left-0 w-full h-full rounded-r-[10px] bg-black opacity-20"></div>
        </div>
      </div>
    </div>
  );
}
