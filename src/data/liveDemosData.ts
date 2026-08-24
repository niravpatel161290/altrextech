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
  // RadioTower,
  Building2,
  Wrench,
  Network,
  Droplets,
  Package,
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
        href: "https://ev.altrextech.com",
        icon: Zap,
        description:
          "Monitor EV charging stations and energy delivery in real time.",
      },
      {
        name: "Energy Command Centre",
        href: "https://eccems.altrextech.com/",
        icon: Gauge,
        description:
          "Centralized view of plant-wide energy consumption and load.",
      },
      {
        name: "Enterprise Energy Platform",
        href: "https://eep.altrextech.com/",
        icon: BarChart3,
        description:
          "Enterprise-wide energy analytics and reporting dashboard.",
      },
      {
        name: "Wind farm infrastructure",
        href: "https://wind.altrextech.com/",
        icon: Wind,
        description:
          "Monitor turbine performance and output across a wind farm.",
      },
      {
        name: "Solar Plants",
        href: "https://solar.altrextech.com/",
        icon: Sun,
        description:
          "Track solar plant generation and infrastructure health in real time.",
      },
    ],
  },
  {
    title: "Assets & Utility",
    icon: Flame,
    demos: [
      {
        name: "APM & CMMS CGD",
        href: "https://apm.altrextech.com/",
        icon: Wrench,
        description:
          "Manage asset performance, maintenance activities, work orders, and CGD infrastructure.",
      },
      {
        name: "CGD Asset Console",
        href: "http://cgd.altrextech.com/",
        icon: Flame,
        description:
          "Track and manage assets across the CGD distribution network.",
      },
      {
        name: "CGD AMR Console",
        href: "https://amrgas.altrextech.com/",
        icon: Activity,
        description: "Automatic meter reading for CGD customer connections.",
      },
      // {
      //   name: "CGD AMR Telemetry",
      //   href: "https://amrdemo-cgd.altrextech.com/",
      //   icon: RadioTower,
      //   description:
      //     "Monitor and manage AMR telemetry, smart meter readings, communication status, consumption data, and real-time metering operations.",
      // },
      {
        name: "CGD Pipeline Network",
        href: "https://cgdpipeline.altrextech.com/",
        icon: Network,
        description:
          "Monitor and manage CGD pipeline networks, gas flow, pressure, distribution assets, stations, and real-time network operations.",
      },
      {
        name: "Water AMR Console",
        href: "http://amrwater.altrextech.com/",
        icon: Droplet,
        description: "Automatic meter reading across water utility networks.",
      },
    ],
  },
  {
    title: "Fleet & Logistics",
    icon: Truck,
    demos: [
      {
        name: "CNG Logistics Console",
        href: "https://cascade.altrextech.com/",
        icon: Truck,
        description:
          "Live tracking of CNG cascade logistics and delivery routes.",
      },
      {
        name: "MHE Fleet Command Centre",
        href: "https://mhetracking.altrextech.com/",
        icon: Warehouse,
        description:
          "Coordinate material handling equipment across facilities.",
      },
      {
        name: "Fleet Command",
        href: "https://vts.altrextech.com/",
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
        href: "https://oee.altrextech.com/",
        icon: Factory,
        description:
          "Monitor production lines and overall equipment effectiveness.",
      },
      {
        name: "Water Treatment",
        href: "https://wtp.altrextech.com/",
        icon: Droplet,
        description:
          "Oversee water treatment plant operations and process status.",
      },
      {
        name: "Smart city operations",
        href: "https://smartcity.altrextech.com/",
        icon: Building2,
        description:
          "Monitor and manage smart city infrastructure, operations, assets, and real-time services.",
      },
      {
        name: "Water Distribution",
        href: "https://waterdistribution.altrextech.com/",
        icon: Droplets,
        description:
          "Monitor and manage water distribution networks, pumping stations, reservoirs, flow, pressure, and real-time water supply operations.",
      },

      {
        name: "Product Management",
        href: "https://pmplant.altrextech.com/",
        icon: Package,
        description:
          "Manage products, inventory, specifications, lifecycle, pricing, and real-time product information across operations.",
      },
    ],
  },
];

// Flat list, handy for pages (like the /live-demo overview) that don't need grouping.
export const LIVE_DEMOS: LiveDemo[] = LIVE_DEMO_GROUPS.flatMap(
  (group) => group.demos,
);
