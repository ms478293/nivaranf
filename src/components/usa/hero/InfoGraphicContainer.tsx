import { CloudRainIcon, LockKeyholeOpenIcon, ServerIcon } from "lucide-react";
import Image from "next/image";

const features = [
  {
    name: "Fighting the FireStorm",
    description:
      "Nivaran Foundation provided much-needed aid to the heroic firefighters battling the raging fires. We coordinated with local authorities, provided essential firefighting equipment, and supported the brave men and women working on the front lines.",
    icon: CloudRainIcon,
  },
  {
    name: "Helping the Displaced",
    description:
      "Nivaran Foundation stepped in to support families displaced by the fire. We provided temporary housing, psychological support, and helped reunite families with their lost loved ones. Our dedicated team worked tirelessly to bring comfort to those who had lost everything.",
    icon: LockKeyholeOpenIcon,
  },
  {
    name: "Providing Food and Emergency Relief",
    description:
      "We coordinated large-scale relief efforts to deliver food, clean water, and medical supplies to the affected areas. Through partnerships with local organizations and volunteers, we distributed thousands of meals and ensured that no one was left hungry or without care.",
    icon: ServerIcon,
  },
];

export function InfoGraphicContainer() {
  return (
    <div className="bg-white py-24 sm:py-32 lg:flex justify-center w-full items-center">
      <div className="max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">
                Nivaran Foundation During California Fire
              </h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Helping Bring an End to Suffering
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                The California wildfires were one of the most devastating
                natural disasters the state has ever faced. In the wake of this
                destruction, Nivaran Foundation responded with urgency and
                compassion. Our mission was clear: to save lives, provide
                relief, and help rebuild communities affected by the fires.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute left-1 top-1 size-5 text-indigo-600"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="w-full relative">
            <Image
              alt="California Fire Relief"
              src="/usa/fire.jpeg"
              width={2432}
              height={1442}
              className="w-full h-full rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
