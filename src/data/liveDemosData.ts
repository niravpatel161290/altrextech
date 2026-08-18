import {
  Zap,
  FlaskConical,
  Flame,
  Truck,
  Warehouse,
  Factory,
  Gauge,
  BarChart3,
  Activity,
  Wind,
  Sun,
  Building2,
  Wrench,
  Droplet,
  type LucideIcon,
} from "lucide-react";

export interface LiveDemo {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export interface LiveDemoGroup {
  title: string;
  icon: LucideIcon;
  demos: LiveDemo[];
}

// hrefs point at hosted demo deployments (Vercel previews). Swap in production
// URLs here as they become available — the header menu, mobile accordion, and
// the /live-demo page all read from this single list, so they can't drift.
export const LIVE_DEMO_GROUPS: LiveDemoGroup[] = [
  {
    title: "Energy & Renewable",
    icon: Zap,
    demos: [
      {
        name: "EV Station Centre",
        href: "https://ev-station-mu.vercel.app/",
        icon: Zap,
        description:
          "Monitor EV charging stations and energy delivery in real time.",
      },
      {
        name: "Energy Command Centre",
        href: "https://ems-plant.vercel.app/",
        icon: Gauge,
        description:
          "Centralized view of plant-wide energy consumption and load.",
      },
      {
        name: "Enterprise Energy Platform",
        href: "https://manufacturing-line.vercel.app/",
        icon: BarChart3,
        description:
          "Enterprise-wide energy analytics and reporting dashboard.",
      },
      {
        name: "Wind farm infrastructure",
        href: "https://wind-farms.vercel.app/",
        icon: Wind,
        description:
          "Monitor turbine performance and output across a wind farm.",
      },
    ],
  },
  {
    title: "Utility Network",
    icon: Flame,
    demos: [
      {
        name: "CGD Asset Console",
        href: "https://cgd-network.vercel.app/",
        icon: Flame,
        description:
          "Track and manage assets across the CGD distribution network.",
      },
      {
        name: "CGD AMR Console",
        href: "https://amr-cgd.vercel.app/",
        icon: Activity,
        description: "Automatic meter reading for CGD customer connections.",
      },
      {
        name: "Water AMR Console",
        href: "https://amr-water.vercel.app/",
        icon: Droplet,
        description: "Automatic meter reading across water utility networks.",
      },
      {
        name: "APM & CMMS CGD",
        href: "https://apm-cmms.vercel.app/",
        icon: Wrench,
        description:
          "Manage asset performance, maintenance activities, work orders, and CGD infrastructure.",
      },
    ],
  },
  {
    title: "Fleet & Logistics",
    icon: Truck,
    demos: [
      {
        name: "CNG Logistics Console",
        href: "https://vts-khaki.vercel.app/",
        icon: Truck,
        description:
          "Live tracking of CNG cascade logistics and delivery routes.",
      },
      {
        name: "MHE Fleet Command Centre",
        href: "https://mhe-tracking.vercel.app/",
        icon: Warehouse,
        description:
          "Coordinate material handling equipment across facilities.",
      },
      {
        name: "Fleet Command",
        href: "https://vts-logistics.vercel.app/",
        icon: Truck,
        description: "Live fleet tracking and dispatch across your network.",
      },
    ],
  },
  {
    title: "Process Industry",
    icon: FlaskConical,
    demos: [
      {
        name: "Production & OEE Console",
        href: "https://manufacturing-line.vercel.app/",
        icon: Factory,
        description:
          "Monitor production lines and overall equipment effectiveness.",
      },
      {
        name: "Plant infrastructure",
        href: "https://solar-plants.vercel.app/",
        icon: Sun,
        description:
          "Track solar plant generation and infrastructure health in real time.",
      },
      {
        name: "Plant operations",
        href: "https://wtp-plant.vercel.app/",
        icon: Droplet,
        description:
          "Oversee water treatment plant operations and process status.",
      },
      {
        name: "Smart city operations",
        href: "https://smart-city-six-gray.vercel.app/",
        icon: Building2,
        description:
          "Monitor and manage smart city infrastructure, operations, assets, and real-time services.",
      },
    ],
  },
];

// Flat list, handy for pages (like the /live-demo overview) that don't need grouping.
export const LIVE_DEMOS: LiveDemo[] = LIVE_DEMO_GROUPS.flatMap(
  (group) => group.demos,
);
