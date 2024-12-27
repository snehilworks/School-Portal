import React, { useState } from "react";
import { Home, Users, Mail, School, Building2, DollarSign } from "lucide-react";

const AdminSidebar = ({ setSelectedContent }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navigationGroups = [
    {
      title: "Overview",
      items: [
        {
          name: "Dashboard",
          icon: Home,
          onClick: () => setSelectedContent("Dashboard"),
        },
      ],
    },
    {
      title: "Teacher Management",
      items: [
        {
          name: "Add Teacher",
          icon: Users,
          onClick: () => setSelectedContent("Add Teacher"),
        },
        {
          name: "Update Teacher",
          icon: Users,
          onClick: () => setSelectedContent("Update Teacher"),
        },
        {
          name: "Delete Teacher",
          icon: Users,
          onClick: () => setSelectedContent("Delete Teacher"),
        },
      ],
    },
    {
      title: "Student Services",
      items: [
        {
          name: "Update Student Admission Status",
          icon: School,
          onClick: () => setSelectedContent("Update Student Admission Status"),
        },
        {
          name: "Admission Forms",
          icon: School,
          onClick: () => setSelectedContent("Admission Form"),
        },
        {
          name: "Hostel Forms",
          icon: Building2,
          onClick: () => setSelectedContent("Hostel Form"),
        },
      ],
    },
    {
      title: "Finance",
      items: [
        {
          name: "Set-Fees",
          icon: DollarSign,
          onClick: () => setSelectedContent("Set-Fees"),
        },
        {
          name: "Payments",
          icon: DollarSign,
          onClick: () => setSelectedContent("Payments"),
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          name: "Contact Messages",
          icon: Mail,
          onClick: () => setSelectedContent("Contact Messages"),
        },
      ],
    },
  ];

  return (
    <div className="h-[92vh] w-80 bg-gray-900 text-gray-300 overflow-y-auto sticky top-16">
      <div className="p-4">
        {navigationGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isActive = activeItem === item.name;

                return (
                  <button
                    key={itemIndex}
                    onClick={() => {
                      setActiveItem(item.name);
                      item.onClick();
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-150 ease-in-out
                      ${
                        isActive
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                  >
                    <Icon
                      size={18}
                      className={`mr-3 ${isActive ? "text-blue-400" : ""}`}
                    />
                    <span className="truncate">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
