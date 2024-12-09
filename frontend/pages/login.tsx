import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

import * as React from "react";
import { LoadingCircle } from "@/components/LoadingCircle";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession({ required: false });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  async function submitLogin(e: any) {
    setProcessing(true);
    e.preventDefault();

    // set the token in the session
    await signIn("credentials", {
      redirect: false,
      username: email,
      password: password,
    });
    // check if the callbackUrl get parameter is set, if so redirect to that url
    setProcessing(false);
  }
  if (session && !processing) {
    console.log("session");
    router.push("/dashboard");
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 relative md:block sm:hidden">
        <img
          src="/giza.jpg"
          className="h-screen w-full object-cover rounded-r-[10px]"
        />
        <div className="absolute top-0 left-0 w-full h-full rounded-r-[10px] bg-black opacity-20"></div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={submitLogin} className="w-3/4 max-w-md text-center">
          <h1 className="text-center font-inter text-4xl font-semibold mb-6">
            Sign in to Avenir
          </h1>

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
              Continue with Google
            </Button>
          </div>
          {/* <div className="mb-4 w-full">
            <Button
              onClick={() => signIn("github")}
              type="button"
              className="flex gh-btn items-center justify-center w-full text-slate-900 hover:bg-slate-900 hover:text-white border border-slate-900 rounded-[6px] h-[40px] bg-transparent"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png"
                className="w-6 h-6 transition-colors duration-200"
                type="button"
              />
              Continue with GitHub
            </Button>
          </div> */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">
              OR
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="mb-4 w-full">
            <div className="text-center">
              <label
                htmlFor="email"
                className="block text-sm font-inter font-medium text-gray-700 text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="mb-6 w-full">
            <div className="flex w-full justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-inter font-medium text-gray-700 text-left"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-sm font-medium underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 flex justify-center h-[40px] items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              onClick={submitLogin}
              className="flex items-center justify-center w-full border-[6px] text-white border-slate-900 hover:border-slate-800 hover:bg-slate-800 rounded-md bg-slate-900"
              disabled={processing}
            >
              {processing ? <LoadingCircle /> : "Log in"}
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium">
              No account?{" "}
              <a href="/signup" className="underline">
                Create one
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
