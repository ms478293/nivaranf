"use client";

import { navItems } from "@/content/sidebarData";
import Link from "next/link";

const NavGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {navItems.map((item, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            {/* <item.icon className="w-8 h-8 text-blue-500 mr-4" /> */}
            <h2 className="text-lg font-semibold">{item.label}</h2>
          </div>
          <ul className="space-y-2">
            {item.children &&
              item.children.map((child, childIdx) => (
                <li key={childIdx}>
                  <Link
                    href={child.href as string}
                    className="flex items-center text-sm text-gray-700 hover:text-blue-500 transition-colors"
                  >
                    <child.icon className="w-5 h-5 mr-2 text-gray-400" />
                    {child.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

function Dashboard() {
  return (
    <h1>
      <NavGrid></NavGrid>
    </h1>
  );
}

export default Dashboard;
