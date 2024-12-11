import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import HomeMenu from "@/components/homepage-nav";
import { ArrowRight, CircleCheck, CloudCog, Mail, Router, WandSparkles } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Pricing18 = () => {
  const router = useRouter();
  return (
    <section id="pricing" className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty mb-8 text-4xl lg:text-6xl">Pricing</h2>
          <div className="flex flex-col items-stretch gap-6 md:flex-row">
            <Card className="flex w-80 flex-col justify-between text-left">
              <CardHeader className="gap-y-2">
                <CardTitle>
                  <p>Basic</p>
                </CardTitle>
                <span className="text-4xl font-bold">FREE</span>
              </CardHeader>
              <CardContent>
                <Separator className="mb-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Up to 5 collections.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>20 GB Storage.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Automatic Upload Sync.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Regular emails including memories.</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button onClick={() => router.push("/signup")} className="w-full">
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex w-80 flex-col justify-between text-left">
              <CardHeader>
                <CardTitle className="gap-y-2">
                  <p>Standard</p>
                </CardTitle>
                <span className="text-4xl font-bold">
                  $8.99<span className="font-light">/month</span>
                </span>
              </CardHeader>
              <CardContent>
                <Separator className="mb-6" />
                <p className="mb-3 text-lg font-semibold">
                  Everything in Basic
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Up to 60 collections.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>1 TB storage.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>AI assistant for organization.</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button onClick={() => router.push("/checkout/standard")} className="w-full">
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex w-80 flex-col justify-between text-left">
              <CardHeader>
                <CardTitle>
                  <p>Premium</p>
                </CardTitle>
                <span className="text-4xl font-bold">
                  $14.99<span className="font-light">/month</span>
                </span>
              </CardHeader>
              <CardContent>
                <Separator className="mb-6" />
                <p className="mb-3 text-lg font-semibold">
                  Everything in Standard
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Unlimited Collections.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>AI Montage Maker.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>2 TB storage.</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button onClick={() => router.push("/checkout/premium")} className="w-full">
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const faqItems = [
  {
    question: "How can I get started?",
    answer:
      "You can get started by signing up for a free account or choosing a plan that suits your needs.",
  },
  {
    question: "How can I access my photos?",
    answer:
      "You can access your photos from anywhere using our website and mobile app.",
  },
  {
    question: "What is the AI Montage Maker?",
    answer:
      "The AI Montage Maker is a feature available in the Premium plan that allows you to create montages of your trips easily.",
  },
  {
    question: "What is the Automatic Upload Sync?",
    answer:
      "If you download our mobile app, you can ask the app to automatially copy all your photos and move them onto the platform.",
  },
];

export default function Home() {
  const { data: session, status } = useSession({ required: false });
  const router = useRouter();

  return (
    <React.Fragment>
      <div className="mx-5 mt-5 flex items-center justify-between">
        <div className="flex items-center text-center justify-center">
          <img src="/favicon.svg" alt="Logo" className="w-12 h-12" />
          <h1 className="text-lg font-inter font-medium">Avenir</h1>
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
          <Button
            className="self-start px-4 py-6 text-xl"
            onClick={() => router.push("/signup")}
          >
            Get Started
          </Button>
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
              src="https://images3.alphacoders.com/853/853174.jpg"
              alt="Image 3"
              className="w-full h-56 rounded-[10px] shadow-md object-cover col-span-2"
            />
          </div>
        </div>
      </div>
      <Separator />
      <div
        id="features"
        className="flex flex-col items-center font-inter justify-center py-16 "
      >
        <h2 className="text-[60px] mb-[4rem]">Get more from every photo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-full min-h-full mx-8">
          <div className="flex flex-col items-center justify-center p-16 rounded-lg border bg-card text-card-foreground shadow-sm text-center">
            <div className="mb-6 text-center flex flex-col items-center">
              <CloudCog className="w-[70px] h-[70px] mb-6" />

              <h3 className="text-3xl font-semibold mb-6">
                Accessible Everywhere
              </h3>
              <p className="text-xl mb-6">
                Download and upload photos from anywhere using our website and
                our mobile app to keep your collections updated.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-16 rounded-lg border bg-card text-card-foreground shadow-sm text-center">
            <div className="mb-6 text-center flex flex-col items-center">
              <Mail className="w-[70px] h-[70px] mb-6" />
              <h3 className="text-3xl font-semibold mb-6">Recurrent Emails</h3>
              <p className="text-xl mb-6">
                Keep your memories alive through regular emails we send you
                including images and notes from your trip.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-16 rounded-lg border bg-card text-card-foreground shadow-sm text-center">
            <div className="mb-6 text-center flex flex-col items-center">
              <WandSparkles className="w-[70px] h-[70px] mb-6" />
              <h3 className="text-3xl font-semibold mb-6">Montage Creator</h3>
              <p className="text-xl mb-6">
                Create montages of any trip you take to easily share to friends
                and family.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-center font-inter">
        <Pricing18 />
      </div>
      <Separator />
      <div
        id="faq"
        className="flex flex-col items-center font-inter justify-center py-16 "
      >
        <h2 className="text-[60px] mb-[4rem]">Frequently Asked Questions</h2>
        <div className="w-full max-w-4xl">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Avenir</h3>
            <p className="text-sm italic">
              "Treasure your journeys, relive the moments"
            </p>
            <p className="text-sm">© 2024 Avenir. All rights reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <a href="/wip" className="text-sm hover:underline">
              About Us
            </a>
            <a href="/wip" className="text-sm hover:underline">
              Contact
            </a>
            <a href="/wip" className="text-sm hover:underline">
              Privacy Policy
            </a>
            <a href="/wip" className="text-sm hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="text-center">
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm hover:underline"
          >
            Back to Top
          </a>
        </div>
      </footer>
    </React.Fragment>
  );
}
