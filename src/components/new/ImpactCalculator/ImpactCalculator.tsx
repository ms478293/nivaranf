"use client";

import { AppButton } from "@/components/ui/app-button";
import { useState } from "react";

interface ImpactItem {
  amount: number;
  title: string;
  icon: string;
}

const IMPACT_MAPPING: Record<number, ImpactItem> = {
  100: {
    amount: 100,
    title: "Provides medicine for 1 child for 1 month",
    icon: "💊",
  },
  500: {
    amount: 500,
    title: "Feeds a family of 4 for 1 week",
    icon: "🍽️",
  },
  1000: {
    amount: 1000,
    title: "Funds 1 health checkup for 5 patients",
    icon: "🏥",
  },
  2500: {
    amount: 2500,
    title: "Sponsors 1 student's school supplies for a year",
    icon: "📚",
  },
  5000: {
    amount: 5000,
    title: "Supports 1 mobile health camp for 1 day",
    icon: "🚐",
  },
  10000: {
    amount: 10000,
    title: "Provides maternal care for 3 mothers",
    icon: "👩‍⚕️",
  },
  25000: {
    amount: 25000,
    title: "Runs a 3-day health camp serving 50+ patients",
    icon: "🏕️",
  },
  50000: {
    amount: 50000,
    title: "Funds a full community health program for 1 month",
    icon: "🌍",
  },
};

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

const ImpactCalculator = () => {
  const [selectedAmount, setSelectedAmount] = useState(500);

  const currentImpact = IMPACT_MAPPING[selectedAmount] || {
    amount: selectedAmount,
    title: `Your custom donation of NPR ${selectedAmount.toLocaleString(
      "en-IN"
    )} will make a real difference`,
    icon: "✨",
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSelectedAmount(value);
  };

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleDonateThis = () => {
    // Scroll to donation form
    const donationCard = document.querySelector('[data-donation-form]');
    if (donationCard) {
      donationCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  return (
    <section className="w-full px-4 py-12 bg-white">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            See Your Impact
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every rupee you donate directly helps save lives and transform communities in Nepal. Select any amount to see the real-world impact your generosity creates.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-gradient-to-br from-primary-50 via-white to-orange-50 rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Input Section */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Choose Your Donation
              </h3>

              {/* Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label
                    htmlFor="amount-slider"
                    className="text-sm font-medium text-gray-700"
                  >
                    Amount (NPR)
                  </label>
                  <span className="text-3xl font-bold text-primary-500">
                    NPR {formatAmount(selectedAmount)}
                  </span>
                </div>

                <input
                  id="amount-slider"
                  type="range"
                  min="100"
                  max="50000"
                  value={selectedAmount}
                  onChange={handleSliderChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500 slider"
                  style={{
                    background: `linear-gradient(to right, #00a896 0%, #00a896 ${
                      ((selectedAmount - 100) / (50000 - 100)) * 100
                    }%, #e5e7eb ${
                      ((selectedAmount - 100) / (50000 - 100)) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />

                <div className="flex justify-between text-xs text-gray-500">
                  <span>NPR 100</span>
                  <span>NPR 50,000</span>
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Quick Select
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {PRESET_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handlePresetClick(amount)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 text-sm ${
                        selectedAmount === amount
                          ? "bg-primary-500 text-white shadow-md scale-105"
                          : "bg-white border border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500"
                      }`}
                    >
                      NPR {formatAmount(amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <AppButton
                onClick={handleDonateThis}
                className="w-full py-4 text-base font-medium"
              >
                Donate This Amount
              </AppButton>
            </div>

            {/* Right: Impact Display */}
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-md p-8 w-full text-center">
                {/* Icon */}
                <div className="text-7xl mb-6">{currentImpact.icon}</div>

                {/* Impact Text */}
                <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  Your {currentImpact.amount === selectedAmount ? "donation" : "gift"} of NPR{" "}
                  <span className="text-primary-500">
                    {formatAmount(currentImpact.amount)}
                  </span>
                </h4>

                {/* Impact Description */}
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {currentImpact.title}
                </p>

                {/* Trust Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                  <p className="text-xs text-green-800 font-medium">
                    ✓ 100% tax-deductible
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    85% goes directly to programs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <h4 className="text-lg font-bold text-blue-900 mb-2">
              Direct Impact
            </h4>
            <p className="text-sm text-blue-700">
              Every rupee goes to healthcare and education
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h4 className="text-lg font-bold text-green-900 mb-2">
              Tax-Deductible
            </h4>
            <p className="text-sm text-green-700">
              Get a tax receipt immediately via email
            </p>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-lg">
            <h4 className="text-lg font-bold text-orange-900 mb-2">
              Transparent Reporting
            </h4>
            <p className="text-sm text-orange-700">
              See how your gift creates change
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactCalculator;
