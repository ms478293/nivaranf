"use client";

import { AppButton } from "@/components/ui/app-button";
import { useEffect, useState } from "react";

const DonationProgress = () => {
  const [progressPercentage, setProgressPercentage] = useState(0);

  const raisedAmount = 850000; // USD 850,000
  const goalAmount = 7500000; // USD 7,500,000
  const numDonors = 1247;
  const daysLeft = 189;
  const campaignTitle = "2026 Annual Campaign";

  // Calculate actual percentage
  const actualPercentage = Math.min(
    Math.round((raisedAmount / goalAmount) * 100),
    100
  );

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressPercentage(actualPercentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [actualPercentage]);

  // Format amount with commas
  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-US");
  };

  const handleDonateNow = () => {
    // Open Square custom donation link in popup
    const url = "https://square.link/u/Ch7Es46t";
    const w = 800, h = 600;
    const left = (screen.width - w) / 2;
    const top = (screen.height - h) / 2;
    window.open(url, `square_donate_${Date.now()}`, `width=${w},height=${h},top=${top},left=${left},scrollbars=yes,noopener,noreferrer`);
  };

  return (
    <section className="w-full px-4 py-12 bg-gradient-to-br from-teal-50 to-orange-50">
      <div className="max-w-[1320px] mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {campaignTitle}
            </h2>
            <p className="text-gray-600 text-sm">
              Help us reach our goal and expand life-saving healthcare and education programs
            </p>
          </div>

          {/* Progress Section */}
          <div className="space-y-6">
            {/* Amount Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                  Amount Raised
                </p>
                <p className="text-3xl font-bold text-primary-500">
                  ${formatAmount(raisedAmount)}
                </p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                  Our Goal
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  ${formatAmount(goalAmount)}
                </p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                  Campaign Status
                </p>
                <p className="text-3xl font-bold text-orange-500">
                  {actualPercentage}%
                </p>
                <p className="text-xs text-gray-600 mt-1">funded</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Progress
                </span>
                <span className="text-sm font-semibold text-primary-500">
                  {actualPercentage}% Complete
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="h-4 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full transition-transform duration-1000 ease-out origin-left"
                  style={{ transform: `scaleX(${progressPercentage / 100})` }}
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>${formatAmount(goalAmount)}</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-500">
                  {numDonors.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600 mt-1">Generous Donors</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">
                  {daysLeft}
                </p>
                <p className="text-xs text-gray-600 mt-1">Days Remaining</p>
              </div>

              <div className="text-center col-span-2 md:col-span-1">
                <p className="text-2xl font-bold text-green-600">
                  ${formatAmount(goalAmount - raisedAmount)}
                </p>
                <p className="text-xs text-gray-600 mt-1">To Goal</p>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="mt-8 flex justify-center">
              <AppButton
                onClick={handleDonateNow}
                className="px-8 py-3 text-base font-medium"
              >
                Donate Now
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationProgress;
