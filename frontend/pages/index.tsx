import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import HomeMenu from "@/components/homepage-nav";
import { Router } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession({ required: false });
  const router = useRouter();
  return (
    <React.Fragment>
      <div className="mx-5 mt-5 flex items-center justify-between">
        <div className="flex items-center text-center justify-center">
        <img src="/favicon.svg" alt="Logo" className="w-12 h-12" />
        <h1 className="text-lg font-inter">Avenir</h1>
        </div>
        <div className="text-lg flex justify-between gap-x-4">
          <HomeMenu />
          <Button onClick={() => router.push("/login")}>Log in</Button>
        </div>
      </div>
      <div id="home" className="flex items-center font-inter min-h-screen">
        <div className="flex ml-4 flex-col items-start justify-center space-y-8 px-4 w-1/2">
          <h1 className="text-[60px] font-semibold text-left">
            Treasure your journeys, relive the moments
          </h1>
          <p className="text-2xl text-left">
            A centralized, cloud media storage base to keep all your journeys in
            one place
          </p>
          <Button className="self-start px-4 py-6 text-xl" onClick={() => router.push("/signup")}>Get Started</Button>
        </div>
        <div className="flex-1 flex justify-center items-center min-h-full">
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <img
              src="/giza.jpg"
              alt="Image 1"
              className="w-full h-56 rounded-[10px] shadow-md object-cover"
            />
            <img
              src="https://images7.alphacoders.com/898/898714.jpg"
              alt="Image 2"
              className="w-full h-56 rounded-[10px] shadow-md object-cover"
            />
            <img
              src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
              alt="Image 3"
              className="w-full h-56 rounded-[10px] shadow-md object-cover col-span-2"
            />
          </div>
        </div>
      </div>
      <div
        id="features"
        className="flex flex-col items-center font-inter justify-center py-16 bg-gray-100"
      >
        <h2 className="text-[60px] mb-[4rem]">Get more from every photo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-full min-h-full mx-8">
          <div className="flex flex-col items-center justify-center p-16 bg-white rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-6">
              <svg
                width="70"
                height="70"
                viewBox="0 0 145 145"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-6"
              >
                <g clip-path="url(#clip0_152_1008)">
                  <path
                    d="M3.99304 131.208C-1.30286 125.912 -1.30286 117.302 3.99304 111.978L111.978 3.99292C117.274 -1.30298 125.884 -1.30298 131.208 3.99292L141.007 13.7917C146.303 19.0876 146.303 27.697 141.007 33.0212L32.993 141.007C27.6971 146.302 19.0878 146.302 13.7635 141.007L3.99304 131.208ZM98.4413 53.1287L128.178 23.3923L121.607 16.7937L91.871 46.53L98.4696 53.1287H98.4413Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_152_1008">
                    <rect width="145" height="145" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <h3 className="text-3xl font-semibold mb-6">
              Accessible Everywhere
            </h3>
            <p className="text-xl mb-6">
              Download and upload photos from anywhere using our website and our
              mobile app to keep your collections updated.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-16 bg-white rounded-lg shadow-md text-center">
            <svg
              width="80"
              height="76"
              viewBox="0 0 161 152"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="mb-6"
            >
              <rect width="161" height="152" fill="url(#pattern0_235_13)" />
              <defs>
                <pattern
                  id="pattern0_235_13"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_235_13"
                    transform="matrix(0.00491718 0 0 0.00520833 -0.0015528 0)"
                  />
                </pattern>
                <image
                  id="image0_235_13"
                  width="204"
                  height="192"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <h3 className="text-3xl font-semibold mb-6">Recurrent Emails</h3>
            <p className="text-xl mb-6">
              Keep your memories alive through regular emails we send you
              including images and notes from your trip.
            </p>
          </div>
          <div className="flex justify-center flex-col items-center bg-white p-12 rounded-lg shadow-md text-center">
            <svg
              width="83"
              height="73"
              viewBox="0 0 166 147"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-6"
            >
              <path
                d="M0 36.75C0 26.615 8.27118 18.375 18.4444 18.375H92.2222C102.395 18.375 110.667 26.615 110.667 36.75V110.25C110.667 120.385 102.395 128.625 92.2222 128.625H18.4444C8.27118 128.625 0 120.385 0 110.25V36.75ZM161.13 28.6535C164.127 30.2613 166 33.3621 166 36.75V110.25C166 113.638 164.127 116.739 161.13 118.346C158.132 119.954 154.501 119.782 151.648 117.887L123.981 99.5121L119.889 96.7846V91.875V55.125V50.2154L123.981 47.4879L151.648 29.1129C154.472 27.2467 158.103 27.0457 161.13 28.6535Z"
                fill="black"
              />
            </svg>

            <h3 className="text-3xl font-semibold mb-6">Montage Creator</h3>
            <p className="text-xl mb-6">
              Create montages of any trip you take to easily share to friends
              and family.
            </p>
          </div>
        </div>
      </div>
      <div
        id="pricing"
        className="flex flex-col items-center font-inter justify-center py-16 bg-white"
      >
        <h2 className="text-[60px] mb-[4rem]">Pricing</h2>
        <div className="grid [&>*]:py-[3rem] mb-[4rem] grid-cols-1 md:grid-cols-3 gap-12 max-w-full min-h-full mx-8">
          <div className="flex flex-col items-center justify-center p-16 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-4xl font-semibold mb-6">Basic</h3>
            <p className="text-3xl mb-6">FREE</p>
            <ul className="text-left mb-4">
              <li className="text-2xl">5 Collections</li>
              <li className="text-2xl">20GB Storage</li>
              <li className="text-2xl">Regular emails including memories</li>
            </ul>
            <Button className="px-8 py-4 text-xl w-full">Choose Plan</Button>
          </div>
          <div className="flex flex-col items-center justify-center p-16 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-4xl font-semibold mb-6">Standard</h3>
            <p className="text-3xl mb-6">$8.99/month</p>
            <ul className="text-left mb-4">
              <li className="text-2xl">AI Montage Maker</li>
              <li className="text-2xl">50 Collections</li>
              <li className="text-2xl">1TB Storage</li>
              <li className="text-2xl">All features from Basic included</li>
            </ul>
            <Button className="px-8 py-4 text-xl w-full">Choose Plan</Button>
          </div>
          <div className="flex flex-col items-center justify-center p-16 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-4xl font-semibold mb-6">Premium</h3>
            <p className="text-3xl mb-6">$14.99/month</p>
            <ul className="text-left mb-4">
              <li className="text-2xl">Unlimited Collections</li>
              <li className="text-2xl">2TB Storage</li>
              <li className="text-2xl">All features from Standard included</li>
            </ul>
            <Button className="px-8 py-4 text-xl w-full">Choose Plan</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
