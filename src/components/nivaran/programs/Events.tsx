import { Button } from "@/components/ui/button";
import { ProgramEventDataType } from "@/content/site-data";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";

export const Events = (data: ProgramEventDataType) => {
  return (
    <div className="flex justify-center w-full ">
      <div className="relative overflow-x-auto rounded-xl w-full ">
        <table className="w-full text-left text-sm text-gray-900 ">
          <caption className="bg-gray-100 p-5 w-full text-start text-2xl font-bold text-secondary-main">
            {data.title}
            <p className=" text-sm text-gray-700">{data.description}</p>
          </caption>
          <thead className="bg-gray-100 text-xs uppercase text-secondary-main border-y">
            <tr className="[&>th]:text-nowrap">
              <th scope="col" className="px-4 sm:px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data.data.map((events, index) => (
              <tr key={index} className="bg-gray-50 border-b  transition">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {events.name}
                </th>
                <td className="px-4 sm:px-6 py-4">{events.location}</td>
                <td className="px-4 sm:px-6 py-4">{events.startDate}</td>
                <td className="px-4 sm:px-6 py-4">
                  {events.endDate || "Ongoing"}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  {events.status === "ongoing" ||
                  events.status === "planned" ? (
                    <Link href="/volunteer">
                      <Button
                        variant="outline"
                        className="text-sm sm:text-base transition hover:bg-primary-main hover:text-white"
                      >
                        Click to Volunteer
                      </Button>
                    </Link>
                  ) : events.status === "Success" ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Success
                    </span>
                  ) : events.status === "planned" ? (
                    <span className="flex items-center text-blue-600">
                      <Clock className="mr-2 h-4 w-4" />
                      Planned
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <XCircle className="mr-2 h-4 w-4" />
                      {events.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
