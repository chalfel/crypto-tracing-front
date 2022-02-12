import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { FiCheck, FiCrosshair, FiBell } from "react-icons/fi";
import { BiDevices } from "react-icons/bi";
import { IoDocumentOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { validateEmail } from "../common/regex";
import axios from "axios";

const NavigationBar = () => {
  return (
    <nav>
      <ul className="flex flex-row gap-5">
        <li className="font-bold text-white">
          <a
            className="text-white decoration-transparent hover:text-muted-primary"
            href="#benefits"
          >
            Benefits
          </a>
        </li>
        <li className="font-bold text-white">
          <a
            className="text-white decoration-transparent hover:text-muted-primary"
            href="#pricing"
          >
            Pricing
          </a>
        </li>
        <li className="font-bold text-white">
          <a
            className="text-white decoration-transparent hover:text-muted-primary"
            href="https://discord.gg/9Z34BbhB4U"
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
        </li>
      </ul>
    </nav>
  );
};
export type Benefits = {
  title: string;
  includes: boolean;
};
export type PricingCardProps = {
  glow?: boolean;
  title: string;
  price?: string;
  buttonTitle: string;
  handleOnClick: () => void;
  benefits: Benefits[];
  enable: boolean;
};
export const PricingCard: React.FC<PricingCardProps> = ({
  glow = false,
  title,
  price,
  buttonTitle,
  handleOnClick,
  benefits,
  enable,
}: PricingCardProps) => {
  return (
    <div
      className={`flex flex-col rounded-md border py-20 px-16 ${
        glow ? "border-primary shadow-2xl shadow-primary" : "border-gray-500"
      }`}
    >
      <h1 className="mt-10 text-center text-2xl font-bold text-white">
        {title}
      </h1>
      {price && (
        <h1 className="mt-10 text-center text-4xl font-bold text-white">
          {price}
        </h1>
      )}
      <ul className="mt-10 mb-10 space-y-4">
        {benefits.map((benefit) => (
          <li
            className="flex flex-row items-center gap-x-1 text-white"
            key={benefit.title}
          >
            {benefit.includes ? (
              <FiCheck className="text-md text-white" />
            ) : (
              <FiCrosshair className="text-md text-white" />
            )}
            {benefit.title}
          </li>
        ))}
      </ul>
      <a
        href="#send-form"
        className={`mb-5 rounded-lg bg-primary py-4 px-10 text-center  ${
          enable
            ? "bg-primary text-black"
            : "rounded-lg border-2 border-gray-400 bg-transparent text-gray-400"
        }`}
        onClick={handleOnClick}
      >
        {buttonTitle.toUpperCase()}
      </a>
    </div>
  );
};

const prices: PricingCardProps[] = [
  {
    benefits: [
      {
        includes: true,
        title: "10 crypto trace",
      },
      {
        includes: true,
        title: "3 devices",
      },
      {
        includes: true,
        title: "25 custom alerts",
      },
      {
        includes: true,
        title: "5 reports",
      },
    ],
    glow: false,
    title: "Standard",
    price: "9.97$",
    buttonTitle: "Release soon...",
    handleOnClick: () => {},
    enable: false,
  },
  {
    benefits: [
      {
        includes: true,
        title: "Unlimited crypto trace",
      },
      {
        includes: true,
        title: "Unlimited devices",
      },
      {
        includes: true,
        title: "Unlimited alerts",
      },
      {
        includes: true,
        title: "Unlimited reports",
      },
    ],
    glow: true,
    title: "BETA",
    price: "Free",
    buttonTitle: "Start free trial",
    handleOnClick: () => {},
    enable: true,
  },
  {
    benefits: [
      {
        includes: true,
        title: "Unlimited crypto trace",
      },
      {
        includes: true,
        title: "Unlimited devices",
      },
      {
        includes: true,
        title: "Unlimited alerts",
      },
      {
        includes: true,
        title: "Unlimited reports",
      },
    ],
    glow: false,
    title: "Pro",
    price: "19.97$",
    buttonTitle: "Release soon...",
    handleOnClick: () => {},
    enable: false,
  },
];
const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const handleOnSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email.length || !validateEmail(email)) {
      alert("Please enter your email");
      return;
    }
    try {
      await axios.post(
        "https://crypto-lead-store.herokuapp.com/",
        {
          email,
          from: "crypto-tracing",
        },
        {
          headers: {
            Authorization: "piper",
          },
        }
      );
      setEmail("");
      alert(
        "Thank you for subscribing! Beta test is already full, but don't worry, we will keep in touch"
      );
    } catch (err) {
      alert('Something went wrong, please try again later');
    }
  };
  return (
    <main className="h-full w-full bg-background">
      <header className="flex w-full flex-row items-center justify-between px-16 pt-5">
        <p className="text-xl font-bold text-white">CRYPTO TRACING</p>
        <NavigationBar />
      </header>
      <section className="mt-20 flex w-full flex-row items-center justify-between px-32">
        <div className="flex w-1/2 flex-col">
          <p className="text-8xl font-bold text-white">
            Tracing anywhere. Insights for everyone.
          </p>
          <div className="mt-12 flex flex-row">
            <a
              className="w-44 rounded-lg bg-primary py-4 text-center text-black"
              href="#send-form"
            >
              START TRACING
            </a>
            <a
              className="ml-10 w-44 rounded-lg border-2 bg-transparent py-4 text-center text-white"
              href="https://discord.gg/9Z34BbhB4U"
              target="_blank"
              rel="noreferrer"
            >
              JOIN DISCORD
            </a>
          </div>
        </div>
        <Image src="/crypto.svg" height={600} width={600} alt="crypto" />
      </section>
      <section className="my-20 mt-20 flex w-full flex-row items-center justify-center px-32 py-20">
        <div className="container mx-auto">
          <div className="flex flex-row items-center justify-between">
            <p className="w-6/12 text-6xl font-bold text-white">
              Start to trace your favorite cryptos
            </p>
            <div className="w-1/3">
              <p className="text-xl text-white">
                Crypto tracing is the fastest way to stay in touch with all your
                favorite cryptos changes
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="benefits"
        className="my-20 mt-20 flex w-full flex-row items-center justify-center px-32 py-20"
      >
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-white">Benefits</h2>
          <div className="container mt-14 flex flex-row items-center justify-center gap-x-20">
            <BenefitCard
              Icon={FiBell}
              title="Alerts"
              description="Receive alerts to all your favorite cryptos"
            />
            <BenefitCard
              Icon={IoDocumentOutline}
              title="Reports"
              description="Create your own custom reports"
            />
            <BenefitCard
              Icon={BiDevices}
              title="Multiples devices"
              description="Receive notification in multiple devices"
            />
          </div>
        </div>
      </section>
      <section className="my-20 mt-20 flex w-full flex-row items-center justify-center px-32 py-20">
        <div
          className="container mx-auto flex flex-col items-center justify-center"
          id="pricing"
        >
          <h2 className="text-3xl font-bold text-white">Pricing</h2>
          <div className="mt-12 flex flex-row justify-between gap-x-10">
            {prices.map((price) => (
              <PricingCard {...price} key={price.title} />
            ))}
          </div>
        </div>
      </section>
      <section className="my-20 mt-20 flex w-full flex-row items-center justify-center px-32 py-20">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h2 className="mb-14 text-3xl font-bold text-white">JOIN BETA</h2>
          <form
            className="flex w-full flex-row items-center justify-center gap-x-5"
            id="send-form"
          >
            <input
              placeholder="Type your best e-mail"
              value={email}
              className="w-2/5 rounded-lg border border-gray-500 bg-transparent py-4 px-2 text-xl text-white"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className="rounded-lg bg-primary py-4 px-10 text-center text-black"
              onClick={handleOnSubmit}
            >
              JOIN NOW
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;

export type BenefitCardProps = {
  title: string;
  description: string;
  Icon: IconType;
};
const BenefitCard = ({ title, description, Icon }: BenefitCardProps) => {
  return (
    <div className="flex w-80 flex-col items-center rounded-md border border-gray-500 p-10 shadow-md shadow-primary">
      <Icon className="text-md mb-6 text-4xl text-white" />
      <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
      <p className="w-3/4 text-lg text-gray-300">{description}</p>
    </div>
  );
};
