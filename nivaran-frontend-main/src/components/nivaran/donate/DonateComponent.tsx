"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type DonationLink = {
  url: string;
  value: number | "custom";
};

// Recurring donation data
const linksRecurringData: DonationLink[] = [
  { url: "https://square.link/u/SblMfArl", value: 5 },
  { url: "https://square.link/u/MSYjAclC", value: 10 },
  { url: "https://square.link/u/UQpQSqXo", value: 20 },
  { url: "https://square.link/u/SCp4zy6I", value: 50 },
  { url: "https://square.link/u/J1SuHCaP", value: 100 },
  { url: "https://square.link/u/Ch7Es46t", value: "custom" },
];

// One-time donation data
const linksOneTimeData: DonationLink[] = [
  { url: "https://square.link/u/VI6zrzYy", value: 5 },
  { url: "https://square.link/u/ItTRVhZD", value: 10 },
  { url: "https://square.link/u/HEgCo7xf", value: 20 },
  { url: "https://square.link/u/Bzu8hfgd", value: 50 },
  { url: "https://square.link/u/wDK0I87N", value: 100 },
  { url: "https://square.link/u/Ch7Es46t", value: "custom" },
];
const openCenteredPopup = (
  url: string,
  title: string,
  width: number,
  height: number
) => {
  const topWindow = window.top || window;

  const dualScreenLeft =
    topWindow.screenLeft !== undefined
      ? topWindow.screenLeft
      : topWindow.screenX;
  const dualScreenTop =
    topWindow.screenTop !== undefined ? topWindow.screenTop : topWindow.screenY;

  const winWidth =
    topWindow.innerWidth ||
    document.documentElement.clientWidth ||
    screen.width;
  const winHeight =
    topWindow.innerHeight ||
    document.documentElement.clientHeight ||
    screen.height;

  const left = (winWidth - width) / 2 + dualScreenLeft;
  const top = (winHeight - height) / 2 + dualScreenTop;

  const popup = window.open(
    url,
    title,
    `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`
  );

  if (popup) {
    popup.focus();
  } else {
    alert("Popup blocked. Please enable popups for this site.");
  }
};
const DonationButtons = ({
  data,
  selectedPayment,
  setSelectedPayment,
}: {
  data: DonationLink[];
  selectedPayment: DonationLink;
  setSelectedPayment: (payment: DonationLink) => void;
}) => {
  const handlePaymentRedirect = () => {
    openCenteredPopup(selectedPayment.url, "Square Payment Checkout", 800, 600);
  };

  return (
    <div className="flex flex-col items-center space-y-6 mt-4 ">
      <div className="flex flex-col md:flex-row flex-wrap justify-start md:justify-stretch w-full gap-4  md:px-0">
        {data.map((item, index) => (
          <Button
            aria-label="Set Selected Payement amount"
            key={index}
            className={cn(
              "h-20  sm:w-full md:w-40  rounded-lg border text-lg font-medium transition-colors min-w-fit hover:bg-secondary-main",
              selectedPayment === item
                ? "bg-secondary-main text-white border-secondary-main"
                : "bg-primary-main  border-gray-300 "
            )}
            onClick={() => setSelectedPayment(item)}
          >
            {typeof item.value === "number"
              ? linksRecurringData.includes(item)
                ? `$${item.value} / month`
                : `$${item.value}`
              : "Custom Donation"}
          </Button>
        ))}
      </div>
      <Button
        aria-label="Click to donate"
        onClick={handlePaymentRedirect}
        className=" py-6 min-w-fit w-full text-lg bg-secondary-main text-white rounded-lg hover:bg-green-600 transition-transform"
      >
        Proceed to{" "}
        {typeof selectedPayment.value === "number"
          ? `Donate $${selectedPayment.value}${
              data.includes(selectedPayment) && data == linksRecurringData
                ? " / month"
                : ""
            }`
          : "custom amount"}
      </Button>
    </div>
  );
};

export function DonationComponent() {
  const [selectedPayment, setSelectedPayment] = useState<DonationLink>(
    linksRecurringData[0]
  );

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-no-repeat bg-center  py-12 space-y-12"
      style={{ backgroundImage: "url('/backgrounds/happy.gif')" }}
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-black animate-fade-in">
          Your Contribution Creates Change
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Support the Nivaran Foundation in making a difference. Every donation
          brings us one step closer to a better future.
        </p>
        <Link href="/frequently-asked-questions">
          <div className="px-6 py-3 bg-primary-main text-white rounded-md shadow-md hover:bg-primary-main/90 hover:text-white transition duration-100">
            Learn More
          </div>
        </Link>
      </div>

      {/* Donation Section */}
      <div className="bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-3xl space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Choose Your Donation Amount
        </h2>
        <Tabs
          defaultValue="recurring"
          className="w-full lg:p-20 lg:pt-4  border-1 border-black  rounded-lg "
        >
          <TabsList className="flex justify-start h-fit gap-4">
            <TabsTrigger
              value="recurring"
              className="px-4 py-2 font-medium text-lg hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Recurring
            </TabsTrigger>
            <TabsTrigger
              value="onetime"
              className="px-4 py-2 font-medium text-lg hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              One-Time
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recurring">
            <DonationButtons
              data={linksRecurringData}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          </TabsContent>
          <TabsContent value="onetime">
            <DonationButtons
              data={linksOneTimeData}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
