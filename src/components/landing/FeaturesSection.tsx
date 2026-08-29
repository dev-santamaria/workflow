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
    accent: "border-l-3 border-l-[#32298A]",
  },
  {
    icon: Workflow,
    title: "Easy Procurement Process",
    description:
      "Simplify your procurement process with our platform. From initial contact to finalizing contracts, our portal helps streamline the entire journey.",
    tag: "Streamlined Workflow",
    accent: "border-l-3 border-l-[#DCB353]",
  },
  {
    icon: ShieldCheck,
    title: "Verified Suppliers",
    description:
      "Trust is essential in procurement. We verify the legitimacy of our suppliers to ensure buyers are connecting with reliable partners.",
    tag: "Trust & Compliance",
    accent: "border-l-3 border-l-[#32298A]",
  },
  {
    icon: HeadphonesIcon,
    title: "Responsive Support",
    description:
      "Have questions or need assistance? Our support team is here to help, ensuring a smooth experience for all users.",
    tag: "Dedicated Helpdesk",
    accent: "border-l-3 border-l-[#DCB353]",
  },
];

export default function FeaturesSection() {
  return (
    <section id="benefits" className="py-10 sm:py-12 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-[#32298A] uppercase tracking-wider mb-2">
            Core Portal Capabilities
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            Here&apos;s What You Can Expect
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Welcome to our Procurement Portal Home, where efficient procurement meets convenience. Explore, connect, and simplify your procurement journey with us.
          </p>
        </div>

        {/* 4 Clean Feature Cards (Compact) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow duration-150 ${item.accent}`}
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#32298A]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner (Compact) */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Ready to collaborate with Crown Paints Kenya?
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Join hundreds of verified suppliers and access open quotations, tenders, and procurement contracts.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/auth/get-started">
              <Button className="bg-[#32298A] hover:bg-[#261e6d] text-white font-semibold text-xs h-8 px-4 gap-1.5 cursor-pointer rounded-lg">
                <span>Register as Supplier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
