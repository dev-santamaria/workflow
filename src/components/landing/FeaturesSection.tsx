import {
  Layers,
  Workflow,
  ShieldCheck,
  HeadphonesIcon,
  Check,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Layers,
    title: "Comprehensive Supplier Listings",
    description:
      "Suppliers from various industries and sectors are featured on our portal, giving buyers a wide range of options to choose from.",
    tag: "Supplier Directory",
    accent: "border-l-4 border-l-[#32298A]",
  },
  {
    icon: Workflow,
    title: "Easy Procurement Process",
    description:
      "Simplify your procurement process with our platform. From initial contact to finalizing contracts, our portal helps streamline the entire journey.",
    tag: "Streamlined Workflow",
    accent: "border-l-4 border-l-[#DCB353]",
  },
  {
    icon: ShieldCheck,
    title: "Verified Suppliers",
    description:
      "Trust is essential in procurement. We verify the legitimacy of our suppliers to ensure buyers are connecting with reliable partners.",
    tag: "Trust & Compliance",
    accent: "border-l-4 border-l-[#32298A]",
  },
  {
    icon: HeadphonesIcon,
    title: "Responsive Support",
    description:
      "Have questions or need assistance? Our support team is here to help, ensuring a smooth experience for all users.",
    tag: "Dedicated Helpdesk",
    accent: "border-l-4 border-l-[#DCB353]",
  },
];

export default function FeaturesSection() {
  return (
    <section id="benefits" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold text-[#32298A] uppercase tracking-wider mb-3">
            Core Portal Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Here&apos;s What You Can Expect
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Welcome to our Procurement Portal Home, where efficient procurement meets convenience!
            Explore, connect, and simplify your procurement journey with us.
          </p>
        </div>

        {/* 4 Clean Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bg-white rounded-xl p-7 border border-slate-200 shadow-xs hover:shadow-md transition-shadow duration-200 ${item.accent}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#32298A]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 p-8 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Ready to collaborate with Crown Paints Kenya?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Join hundreds of verified suppliers and access open quotations, tenders, and procurement contracts.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/auth/get-started">
              <Button className="bg-[#32298A] hover:bg-[#261e6d] text-white font-semibold px-6 h-11 text-sm gap-2 shadow-xs">
                <span>Become a Supplier</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 h-11 text-sm font-semibold">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
