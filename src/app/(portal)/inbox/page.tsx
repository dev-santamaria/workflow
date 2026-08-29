"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FlagIcon, CountryCode } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
} from "@/components/ui/message";
import {
  Search,
  Send,
  Paperclip,
  Plus,
  Phone,
  Mail,
  CheckCheck,
  FileText,
  FileSpreadsheet,
  Receipt,
  Truck,
  Building2,
  ShieldCheck,
  ExternalLink,
  Clock,
  X,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Info,
  Download,
  CheckCircle2,
  Tag,
  Lock,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Types
interface ChatAttachment {
  name: string;
  size: string;
  type: "pdf" | "image";
}

interface ChatMessage {
  id: string;
  sender: "vendor" | "crown_rep" | "system";
  senderName: string;
  senderRole?: string;
  text: string;
  time: string;
  attachments?: ChatAttachment[];
  systemEvent?: boolean;
}

interface ChatThread {
  id: string;
  department: "Procurement Desk" | "Accounts Payable" | "Logistics & Receiving" | "Quality & Compliance";
  contactName: string;
  contactRole: string;
  avatarText: string;
  entity: string;
  flag: CountryCode | string;
  online: boolean;
  lastActive: string;
  unreadCount: number;
  linkedRefType: "RFQ" | "LPO" | "INVOICE" | "GATE_PASS" | "COMPLIANCE";
  linkedRefCode: string;
  linkedRefTitle: string;
  linkedRefHref: string;
  messages: ChatMessage[];
  sharedFiles: ChatAttachment[];
  contactEmail: string;
  contactPhone: string;
}

const initialThreads: ChatThread[] = [
  {
    id: "thread-procurement",
    department: "Procurement Desk",
    contactName: "Sarah Mwangi",
    contactRole: "Senior Procurement Specialist · Raw Materials",
    avatarText: "SM",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    online: true,
    lastActive: "Online now",
    unreadCount: 1,
    linkedRefType: "RFQ",
    linkedRefCode: "RFQ-2026-0810",
    linkedRefTitle: "Pure Acrylic Polymer Emulsions (20 MT Requisition)",
    linkedRefHref: "/rfqs",
    contactEmail: "s.mwangi@crownpaints.co.ke",
    contactPhone: "+254 709 887 114",
    sharedFiles: [
      { name: "RFQ-2026-0810_Technical_Specs.pdf", size: "1.8 MB", type: "pdf" },
      { name: "Apex_Signed_Quotation_Feb26.pdf", size: "420 KB", type: "pdf" },
      { name: "LPO-2026-9842_Official_PO.pdf", size: "640 KB", type: "pdf" },
    ],
    messages: [
      {
        id: "m-1",
        sender: "crown_rep",
        senderName: "Sarah Mwangi",
        senderRole: "Senior Procurement Specialist",
        text: "Jambo Samuel! Crown Paints Procurement has evaluated vendor pre-qualification scores and assigned Requisition REQ-2026-4891 (Pure Acrylic Polymer Emulsion - 55% Solid) to Apex Industrial Polymers.\n\nCould you confirm if you can fulfill the 20 MT batch delivery by March 5th to our Likoni Road plant?",
        time: "Feb 25, 09:15 AM",
        attachments: [
          { name: "RFQ-2026-0810_Technical_Specs.pdf", size: "1.8 MB", type: "pdf" },
        ],
      },
      {
        id: "m-2",
        sender: "vendor",
        senderName: "Samuel Kariuki (Apex)",
        text: "Good morning Sarah. We acknowledge receipt of REQ-2026-4891. We have verified raw material stock at our Nairobi Industrial Area plant.\n\nWe can supply the full 20 MT high-gloss pure acrylic emulsion at the contracted rate of KES 140,000/MT, plus the 10 MT Rutile TiO2 batch at KES 200,000/MT.",
        time: "Feb 25, 10:22 AM",
      },
      {
        id: "m-3",
        sender: "crown_rep",
        senderName: "Sarah Mwangi",
        senderRole: "Senior Procurement Specialist",
        text: "The Likoni plant requires full delivery in a single dispatch directly to bulk storage tank at Receiving Bay 3. Please upload your signed quotation document with lab batch assay parameters.",
        time: "Feb 25, 11:40 AM",
      },
      {
        id: "m-4",
        sender: "vendor",
        senderName: "Samuel Kariuki (Apex)",
        text: "I have uploaded our signed quotation document with laboratory batch assay certificates confirming 55.2% solid content.",
        time: "Feb 26, 09:30 AM",
        attachments: [
          { name: "Apex_Signed_Quotation_Feb26.pdf", size: "420 KB", type: "pdf" },
        ],
      },
      {
        id: "m-5",
        sender: "system",
        senderName: "Crown Portal System",
        text: "⚡ Local Purchase Order LPO-2026-9842 (KES 4,800,000) has been generated and approved by Crown Paints Procurement Management.",
        time: "Feb 27, 08:00 AM",
        systemEvent: true,
      },
      {
        id: "m-6",
        sender: "crown_rep",
        senderName: "Sarah Mwangi",
        senderRole: "Senior Procurement Specialist",
        text: "Official LPO-2026-9842 (KES 4,800,000) has been issued. Please generate the delivery gate pass when dispatching vehicle to Likoni Bay 3.",
        time: "Feb 27, 08:32 AM",
      },
      {
        id: "m-7",
        sender: "vendor",
        senderName: "Samuel Kariuki (Apex)",
        text: "Thank you Sarah. Tanker vehicle KBZ 892Y is prepped and digital Gate Pass GP-2026-0842 has been generated for factory intake.",
        time: "10:15 AM",
      },
    ],
  },
  {
    id: "thread-finance",
    department: "Accounts Payable",
    contactName: "David Ochieng",
    contactRole: "Accounts Payable Lead · Treasury Division",
    avatarText: "DO",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    online: false,
    lastActive: "15m ago",
    unreadCount: 1,
    linkedRefType: "INVOICE",
    linkedRefCode: "INV-2026-9842",
    linkedRefTitle: "eTIMS Tax Invoice & 3-Way Audit Matching (KES 4.8M)",
    linkedRefHref: "/invoicing/INV-2026-9842",
    contactEmail: "d.ochieng@crownpaints.co.ke",
    contactPhone: "+254 709 887 230",
    sharedFiles: [
      { name: "KRA_eTIMS_Invoice_91820481.pdf", size: "380 KB", type: "pdf" },
      { name: "WHT_Exemption_Credit_Schedule.pdf", size: "520 KB", type: "pdf" },
    ],
    messages: [
      {
        id: "m-f1",
        sender: "vendor",
        senderName: "Samuel Kariuki (Apex)",
        text: "Hello David, we have submitted fiscal tax invoice INV-2026-9842 with valid KRA eTIMS QR control code against GRN-KE-2026-0842. Kindly check if 3-way matching is completed.",
        time: "Feb 26, 02:10 PM",
        attachments: [
          { name: "KRA_eTIMS_Invoice_91820481.pdf", size: "380 KB", type: "pdf" },
        ],
      },
      {
        id: "m-f2",
        sender: "crown_rep",
        senderName: "David Ochieng",
        senderRole: "Accounts Payable Lead",
        text: "Hello Samuel. Automated 3-way matching verified delivery quantities, agreed LPO rates, and KRA eTIMS fiscal control signatures. Everything matches 100% with zero variance.",
        time: "Feb 26, 04:45 PM",
      },
      {
        id: "m-f3",
        sender: "system",
        senderName: "Crown Treasury Hub",
        text: "⚡ 3-Way Audit Matching Approved for INV-2026-9842 (Gross KES 4,800,000). Queued for Treasury Batch Release.",
        time: "Feb 27, 09:00 AM",
        systemEvent: true,
      },
      {
        id: "m-f4",
        sender: "crown_rep",
        senderName: "David Ochieng",
        senderRole: "Accounts Payable Lead",
        text: "Payment voucher has been scheduled for Friday Treasury batch run via Central Bank RTGS into your Standard Chartered bank account. 5% Withholding Tax certificate will be generated simultaneously.",
        time: "Yesterday, 04:46 PM",
      },
      {
        id: "m-f5",
        sender: "vendor",
        senderName: "Samuel Kariuki (Apex)",
        text: "Thank you David. We will monitor the portal Statements tab for the remittance advice slip and WHT credit certificate.",
        time: "Yesterday, 05:10 PM",
      },
    ],
  },
  {
    id: "thread-logistics",
    department: "Logistics & Receiving",
    contactName: "John Kamau",
    contactRole: "Receiving Bay 3 Supervisor · Likoni Plant",
    avatarText: "JK",
    entity: "Crown Paints Likoni Plant",
    flag: "KE",
    online: true,
    lastActive: "Online now",
    unreadCount: 0,
    linkedRefType: "GATE_PASS",
    linkedRefCode: "GP-2026-0842",
    linkedRefTitle: "Digital Gate Pass & Bulk Tank Offloading Bay 3",
    linkedRefHref: "/delivery-notes/GP-2026-0842",
    contactEmail: "j.kamau@crownpaints.co.ke",
    contactPhone: "+254 709 887 405",
    sharedFiles: [
      { name: "Digital_Gate_Pass_GP-2026-0842.pdf", size: "290 KB", type: "pdf" },
      { name: "Driver_ID_Verification_KBZ892Y.png", size: "1.1 MB", type: "image" },
    ],
    messages: [
      {
        id: "m-l1",
        sender: "crown_rep",
        senderName: "John Kamau",
        senderRole: "Receiving Bay Supervisor",
        text: "Good morning Apex logistics team. Please notify us once vehicle KBZ 892Y departs from your Nairobi warehouse so we can allocate Bay 3 tank suction pumps.",
        time: "07:30 AM",
      },
      {
        id: "m-l2",
        sender: "vendor",
        senderName: "Samuel Kariuki (Apex)",
        text: "Hi John, vehicle KBZ 892Y carrying 20 MT Pure Acrylic Polymer has departed. Driver has digital Gate Pass QR code GP-2026-0842 on smartphone.",
        time: "08:00 AM",
        attachments: [
          { name: "Digital_Gate_Pass_GP-2026-0842.pdf", size: "290 KB", type: "pdf" },
        ],
      },
      {
        id: "m-l3",
        sender: "crown_rep",
        senderName: "John Kamau",
        senderRole: "Receiving Bay Supervisor",
        text: "Noted Samuel! Bay 3 bulk emulsion storage tank has been cleared and prepped. Our security gate will scan the driver QR on arrival for priority bay intake.",
        time: "08:25 AM",
      },
    ],
  },
  {
    id: "thread-compliance",
    department: "Quality & Compliance",
    contactName: "Grace Wanjiku",
    contactRole: "QA & Vendor Pre-Qualification Specialist",
    avatarText: "GW",
    entity: "Regional Standards Division",
    flag: "KE",
    online: false,
    lastActive: "2h ago",
    unreadCount: 0,
    linkedRefType: "COMPLIANCE",
    linkedRefCode: "KYC-KE-2026-0042",
    linkedRefTitle: "Annual ISO 9001:2015 & KEBS Diamond Mark Certification",
    linkedRefHref: "/compliance",
    contactEmail: "g.wanjiku@crownpaints.co.ke",
    contactPhone: "+254 709 887 180",
    sharedFiles: [
      { name: "KEBS_Diamond_Mark_Apex_2026.pdf", size: "1.5 MB", type: "pdf" },
      { name: "Vendor_Prequalification_Scorecard_A+.pdf", size: "820 KB", type: "pdf" },
    ],
    messages: [
      {
        id: "m-c1",
        sender: "crown_rep",
        senderName: "Grace Wanjiku",
        senderRole: "QA Specialist",
        text: "Hello Apex team. We have received and verified your updated KEBS Diamond Mark certificate and annual ISO audit report. Your vendor pre-qualification status is active with an A+ tier rating.",
        time: "Feb 24, 11:30 AM",
        attachments: [
          { name: "KEBS_Diamond_Mark_Apex_2026.pdf", size: "1.5 MB", type: "pdf" },
        ],
      },
      {
        id: "m-c2",
        sender: "vendor",
        senderName: "Samuel Kariuki (Apex)",
        text: "Thank you Grace. We remain committed to Crown Paints East Africa quality benchmarks and strict raw material consistency.",
        time: "Feb 24, 12:00 PM",
      },
    ],
  },
];

const departmentSelectOptions: CustomSelectOption[] = [
  { value: "Procurement Desk", label: "Procurement & Sourcing", sublabel: "RFQ / LPO Confirmations & Contracts", icon: FileSpreadsheet },
  { value: "Accounts Payable", label: "Accounts Payable & Treasury", sublabel: "eTIMS Invoices, 3-Way Matching & RTGS Payouts", icon: Receipt },
  { value: "Logistics & Receiving", label: "Likoni Factory Receiving Bay", sublabel: "Delivery Gate Passes, Offloading & GRN Receipts", icon: Truck },
  { value: "Quality & Compliance", label: "Quality Assurance & Compliance", sublabel: "KEBS, ISO, Lab Assay Specs & KYC Status", icon: ShieldCheck },
];

const quickReplies = [
  "Quotation confirmed as requested.",
  "Vehicle dispatched with digital Gate Pass.",
  "Tax invoice submitted with KRA eTIMS QR.",
  "Inquiring on RTGS payout batch release.",
  "Batch assay certificate attached.",
];

export default function InboxPage() {
  const [threads, setThreads] = useState<ChatThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>("thread-procurement");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<ChatAttachment | null>(null);
  const [showRightDrawer, setShowRightDrawer] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  // New inquiry modal form state
  const [newDepartment, setNewDepartment] = useState<string>("Procurement Desk");
  const [newSubject, setNewSubject] = useState("");
  const [newLinkedRef, setNewLinkedRef] = useState("RFQ-2026-0810");
  const [newMessageBody, setNewMessageBody] = useState("");

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Scroll container reference
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom without affecting window/parent
  const scrollToBottom = (smooth = true) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
      setIsScrolledUp(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // On initial mount or when switching threads, scroll to bottom without jumping window
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      setIsScrolledUp(false);
    }
  }, [activeThreadId]);

  // Track scroll position to show jump-to-top / jump-to-bottom buttons
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsScrolledUp(distanceFromBottom > 100);
  };

  // Mark active thread as read
  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, unreadCount: 0 } : t))
    );
  };

  // Send Message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() && !attachedFile) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "vendor",
      senderName: "Samuel Kariuki (Apex)",
      text: messageInput.trim(),
      time: "Just now",
      attachments: attachedFile ? [attachedFile] : undefined,
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThreadId) {
          const updatedSharedFiles = attachedFile
            ? [attachedFile, ...t.sharedFiles]
            : t.sharedFiles;
          return {
            ...t,
            messages: [...t.messages, newMsg],
            sharedFiles: updatedSharedFiles,
          };
        }
        return t;
      })
    );

    setMessageInput("");
    setAttachedFile(null);
    setTimeout(() => scrollToBottom(true), 50);
  };

  // Canned Quick Reply
  const handleQuickReply = (text: string) => {
    setMessageInput(text);
  };

  // Mock File upload
  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImg = file.type.startsWith("image/");
      const sizeStr = (file.size / 1024 / 1024).toFixed(1) + " MB";
      setAttachedFile({
        name: file.name,
        size: sizeStr,
        type: isImg ? "image" : "pdf",
      });
    }
  };

  // Create New Thread
  const handleCreateNewThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageBody.trim()) return;

    const newThreadId = `thread-${Date.now()}`;
    const newThread: ChatThread = {
      id: newThreadId,
      department: newDepartment as any,
      contactName: newDepartment === "Accounts Payable" ? "David Ochieng" : "Sarah Mwangi",
      contactRole: "Crown Paints Enterprise Desk",
      avatarText: newDepartment === "Accounts Payable" ? "DO" : "SM",
      entity: "Crown Paints Kenya PLC",
      flag: "KE",
      online: true,
      lastActive: "Online now",
      unreadCount: 0,
      linkedRefType: "RFQ",
      linkedRefCode: newLinkedRef || "GEN-QUERY",
      linkedRefTitle: newSubject || "Vendor Inquiry",
      linkedRefHref: "/overview",
      contactEmail: "procurement@crownpaints.co.ke",
      contactPhone: "+254 709 887 000",
      sharedFiles: [],
      messages: [
        {
          id: `m-init-${Date.now()}`,
          sender: "vendor",
          senderName: "Samuel Kariuki (Apex)",
          text: newMessageBody,
          time: "Just now",
        },
      ],
    };

    setThreads([newThread, ...threads]);
    setActiveThreadId(newThreadId);
    setShowNewModal(false);
    setNewSubject("");
    setNewMessageBody("");
  };

  // Filter threads
  const filteredThreads = threads.filter((t) => {
    const matchesCategory =
      categoryFilter === "ALL" ||
      (categoryFilter === "PROCUREMENT" && t.department === "Procurement Desk") ||
      (categoryFilter === "FINANCE" && t.department === "Accounts Payable") ||
      (categoryFilter === "LOGISTICS" && t.department === "Logistics & Receiving") ||
      (categoryFilter === "COMPLIANCE" && t.department === "Quality & Compliance");

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      t.contactName.toLowerCase().includes(q) ||
      t.department.toLowerCase().includes(q) ||
      t.linkedRefCode.toLowerCase().includes(q) ||
      t.linkedRefTitle.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const totalUnread = threads.reduce((acc, t) => acc + t.unreadCount, 0);

  return (
    <div className="space-y-4" suppressHydrationWarning>
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Supplier Inbox &amp; In-App Chat Desk
            </h1>
            {totalUnread > 0 && (
              <span className="bg-[#32298A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {totalUnread} Unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Direct real-time communication channel with Crown Paints Procurement, Accounts Payable, Receiving Bays, and Quality Assurance.
          </p>
        </div>

        <Button
          onClick={() => setShowNewModal(true)}
          suppressHydrationWarning
          className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-9 px-3.5 gap-2 rounded-lg cursor-pointer flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Inquiry / Message</span>
        </Button>
      </div>

      {/* Main Split Chat Container */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-210px)] min-h-[660px]">
        {/* LEFT COLUMN: Threads List */}
        <div className="lg:col-span-5 xl:col-span-4 border-r border-slate-200 flex flex-col h-full bg-slate-50/50 min-h-0 overflow-hidden">
          {/* Threads Filter & Search */}
          <div className="p-3 border-b border-slate-200 bg-white space-y-2 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input
                placeholder="Search messages, contracts, POs…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs bg-slate-50 border-slate-200 rounded-lg focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5">
              {[
                { label: "All Threads", value: "ALL" },
                { label: "Procurement", value: "PROCUREMENT" },
                { label: "Finance / AP", value: "FINANCE" },
                { label: "Logistics", value: "LOGISTICS" },
                { label: "Compliance", value: "COMPLIANCE" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setCategoryFilter(tab.value)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    categoryFilter === tab.value
                      ? "bg-[#32298A] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Thread Items List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 min-h-0">
            {filteredThreads.map((thread) => {
              const active = thread.id === activeThreadId;
              const lastMessage = thread.messages[thread.messages.length - 1];

              return (
                <div
                  key={thread.id}
                  onClick={() => handleSelectThread(thread.id)}
                  className={`p-3.5 transition-all cursor-pointer select-none space-y-1.5 relative border-l-4 ${
                    active
                      ? "bg-white border-l-[#32298A] shadow-xs"
                      : "border-l-transparent hover:bg-slate-100/60"
                  }`}
                >
                  {/* Top Row: Department & Timestamp */}
                  <div className="flex items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <FlagIcon country={thread.flag} className="w-3.5 h-2.5 rounded-[1px] flex-shrink-0" />
                      <span className="font-semibold text-slate-700 truncate">{thread.department}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap flex-shrink-0 font-mono">
                      {lastMessage?.time || "Active"}
                    </span>
                  </div>

                  {/* Second Row: Contact Name + Online Dot + Unread Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-[#32298A] font-bold text-xs flex items-center justify-center">
                          {thread.avatarText}
                        </div>
                        {thread.online && (
                          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{thread.contactName}</h4>
                    </div>

                    {thread.unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#32298A] text-white font-bold text-[10px] flex-shrink-0">
                        {thread.unreadCount} New
                      </span>
                    )}
                  </div>

                  {/* Third Row: Dedicated Linked Reference Badge (Never wrapped, crisp mono) */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold bg-slate-100 text-[#32298A] border border-slate-200/80 px-2 py-0.5 rounded whitespace-nowrap">
                      <Tag className="w-3 h-3 text-[#32298A]" />
                      {thread.linkedRefCode}
                    </span>
                    <span className="text-xs text-slate-500 truncate font-medium max-w-[170px]">
                      {thread.linkedRefTitle}
                    </span>
                  </div>

                  {/* Fourth Row: Last Message Snippet */}
                  <p className="text-xs text-slate-500 line-clamp-1 leading-normal pl-0.5">
                    {lastMessage ? lastMessage.text : "No messages yet"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Chat Pane + Collapsible Context Info Drawer */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full bg-white relative min-w-0 overflow-hidden">
          {/* Chat Top Header */}
          <div className="h-16 px-4 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-white z-10 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-[#32298A] font-bold text-xs flex items-center justify-center">
                  {activeThread.avatarText}
                </div>
                {activeThread.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {activeThread.contactName}
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                    <FlagIcon country={activeThread.flag} className="w-3.5 h-2.5 rounded-[1px]" />
                    <span>{activeThread.entity}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">
                  {activeThread.contactRole} ·{" "}
                  <span className={activeThread.online ? "text-emerald-600 font-medium" : ""}>
                    {activeThread.lastActive}
                  </span>
                </p>
              </div>
            </div>

            {/* Header Action Tools */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Quick Jump to Top / First Message */}
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                title="Scroll up to first message"
                className="h-8 px-2.5 text-xs font-medium border-slate-200 hover:bg-slate-50 rounded-lg gap-1 hidden sm:flex text-slate-600 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-slate-500" />
                <span>First Msg</span>
              </Button>

              <a
                href={`tel:${activeThread.contactPhone}`}
                title="Direct Phone Call"
                className="p-2 rounded-lg text-slate-500 hover:text-[#32298A] hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${activeThread.contactEmail}`}
                title="Send Email"
                className="p-2 rounded-lg text-slate-500 hover:text-[#32298A] hover:bg-slate-100 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>

              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setShowRightDrawer(!showRightDrawer)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  showRightDrawer ? "bg-slate-100 text-[#32298A]" : "text-slate-500 hover:bg-slate-50"
                }`}
                title="Toggle Context Details"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Linked Transaction Ribbon */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[11px] font-bold text-[#32298A] bg-white border border-slate-200 px-2 py-0.5 rounded uppercase whitespace-nowrap">
                {activeThread.linkedRefType}
              </span>
              <span className="font-mono font-bold text-slate-900 whitespace-nowrap text-xs">{activeThread.linkedRefCode}</span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <span className="text-slate-600 truncate hidden sm:inline text-xs">{activeThread.linkedRefTitle}</span>
            </div>

            <Link
              href={activeThread.linkedRefHref}
              className="text-xs font-semibold text-[#32298A] hover:underline flex items-center gap-1 flex-shrink-0"
            >
              <span>Inspect Document</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Main Chat Workspace (Split into Scrollable Message Stream + Collapsible Context Drawer) */}
          <div className="flex-1 flex min-h-0 overflow-hidden relative">
            {/* Scrollable Messages Section */}
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50/30 overflow-hidden relative">
              {/* Message Feed with guaranteed scrolling */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 min-h-0 relative scroll-smooth"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Conversation Beginning Notice */}
                <div className="pt-2 pb-4 text-center space-y-2 border-b border-slate-200/60 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-[#32298A] font-bold text-sm flex items-center justify-center mx-auto shadow-2xs">
                    {activeThread.avatarText}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{activeThread.contactName}</h4>
                    <p className="text-xs text-slate-500">
                      {activeThread.contactRole} · {activeThread.department}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-white border border-slate-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>Official Enterprise Communication Channel</span>
                  </div>
                </div>

                {/* Message Stream */}
                {activeThread.messages.map((msg) => {
                  if (msg.systemEvent) {
                    return (
                      <div key={msg.id} className="flex items-center justify-center my-3">
                        <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 max-w-md text-center shadow-2xs">
                          <p className="font-medium">{msg.text}</p>
                          <span className="text-[11px] text-slate-400 mt-0.5 block font-mono">{msg.time}</span>
                        </div>
                      </div>
                    );
                  }

                  const isVendor = msg.sender === "vendor";

                  return (
                    <MessageGroup key={msg.id} className={isVendor ? "items-end" : "items-start"}>
                      <Message align={isVendor ? "end" : "start"} className="max-w-[85%] sm:max-w-[78%]">
                        {!isVendor && (
                          <MessageAvatar className="bg-slate-200 text-[#32298A] font-bold text-xs">
                            {activeThread.avatarText}
                          </MessageAvatar>
                        )}

                        <MessageContent>
                          <MessageHeader className="gap-2">
                            <span className="font-semibold text-slate-800 text-xs">
                              {msg.senderName}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">{msg.time}</span>
                          </MessageHeader>

                          {/* Message Bubble */}
                          <div
                            className={`p-3.5 rounded-xl text-sm leading-relaxed ${
                              isVendor
                                ? "bg-[#32298A] text-white rounded-br-xs shadow-xs"
                                : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs"
                            }`}
                          >
                            <p className="whitespace-pre-line">{msg.text}</p>

                            {/* Attachments */}
                            {msg.attachments && msg.attachments.length > 0 && (
                              <div className="mt-2.5 pt-2 border-t border-white/20 space-y-1.5">
                                {msg.attachments.map((att, i) => (
                                  <div
                                    key={i}
                                    className={`p-2 rounded-lg flex items-center justify-between gap-2 text-xs ${
                                      isVendor
                                        ? "bg-white/10 text-white"
                                        : "bg-slate-50 border border-slate-200 text-slate-800"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 truncate">
                                      <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                                      <span className="truncate text-xs font-medium">{att.name}</span>
                                    </div>
                                    <span className="text-[11px] opacity-75 font-mono">{att.size}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <MessageFooter className="gap-1 mt-0.5">
                            {isVendor && <CheckCheck className="w-3.5 h-3.5 text-[#32298A]" />}
                            <span className="text-[11px] text-slate-400 font-mono">{msg.time}</span>
                          </MessageFooter>
                        </MessageContent>
                      </Message>
                    </MessageGroup>
                  );
                })}
              </div>

              {/* Floating "Jump to Latest" Button when scrolled up */}
              {isScrolledUp && (
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => scrollToBottom(true)}
                  className="absolute bottom-24 right-6 z-20 bg-[#32298A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg hover:bg-[#271f6f] transition-all flex items-center gap-1.5 animate-in fade-in zoom-in cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Latest Messages</span>
                </button>
              )}

              {/* Clean Non-Overlapping Quick Reply Bar */}
              <div className="px-4 py-2 border-t border-slate-200 bg-slate-50/90 flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex-shrink-0 flex items-center gap-1 mr-1">
                  <Sparkles className="w-3 h-3 text-[#DCB353]" />
                  Quick Replies:
                </span>
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => handleQuickReply(reply)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs border border-slate-200 whitespace-nowrap transition-colors cursor-pointer shadow-2xs font-medium"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Composer Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex-shrink-0">
                {attachedFile && (
                  <div className="mb-2 p-2 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#32298A]" />
                      <span className="font-semibold text-slate-900 text-xs">{attachedFile.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">({attachedFile.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <label className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0">
                    <Paperclip className="w-4 h-4" />
                    <input
                      type="file"
                      accept=".pdf,image/*,.doc,.docx"
                      onChange={handleFileAttach}
                      className="hidden"
                    />
                  </label>

                  <Input
                    placeholder={`Message ${activeThread.contactName} (${activeThread.department})…`}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-lg flex-1 focus:bg-white"
                  />

                  <Button
                    type="submit"
                    disabled={!messageInput.trim() && !attachedFile}
                    className="h-10 bg-[#32298A] hover:bg-[#271f6f] text-white px-4 rounded-lg cursor-pointer flex-shrink-0 gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-xs font-semibold">Send</span>
                  </Button>
                </div>
              </form>
            </div>

            {/* Context Info Drawer (Collapsible Right Side on Desktop) */}
            {showRightDrawer && (
              <div className="w-72 sm:w-80 border-l border-slate-200 bg-slate-50/70 p-4 space-y-4 overflow-y-auto hidden md:block flex-shrink-0">
                {/* Contact Card */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Crown Paints Department
                  </span>
                  <div className="p-3 bg-white rounded-lg border border-slate-200/80 space-y-1.5 text-xs">
                    <h4 className="font-bold text-slate-900 text-sm">{activeThread.department}</h4>
                    <p className="text-slate-700 font-semibold text-xs">{activeThread.contactName}</p>
                    <p className="text-xs text-slate-500">{activeThread.contactRole}</p>
                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                      <p className="text-slate-600">
                        Email: <span className="font-mono text-slate-800 text-xs">{activeThread.contactEmail}</span>
                      </p>
                      <p className="text-slate-600">
                        Phone: <span className="font-mono text-slate-800 text-xs">{activeThread.contactPhone}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Linked Transaction Card */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Active Linked Reference
                  </span>
                  <div className="p-3 bg-white rounded-lg border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#32298A] text-xs">{activeThread.linkedRefCode}</span>
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase">
                        {activeThread.linkedRefType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug font-medium">{activeThread.linkedRefTitle}</p>
                    <Link href={activeThread.linkedRefHref}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-8 text-xs font-semibold border-slate-200 hover:bg-slate-50 rounded-md cursor-pointer mt-1"
                      >
                        <span>Inspect in Portal</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Shared Documents Repository */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Shared Documents ({activeThread.sharedFiles.length})
                  </span>
                  <div className="space-y-1.5">
                    {activeThread.sharedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-white rounded-lg border border-slate-200/80 flex items-center justify-between text-xs hover:border-[#32298A] transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate text-xs">{file.name}</p>
                            <span className="text-[11px] text-slate-400 font-mono">{file.size}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => alert(`Downloading ${file.name}...`)}
                          className="p-1 text-slate-400 hover:text-[#32298A] cursor-pointer"
                          title="Download document"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Inquiry / Message Modal (Using CustomSelect) */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Compose New Inquiry to Crown Paints</h3>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setShowNewModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewThread} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Recipient Department *</label>
                <CustomSelect
                  options={departmentSelectOptions}
                  value={newDepartment}
                  onChange={(val) => setNewDepartment(val)}
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Inquiry Subject / Topic *</label>
                <Input
                  placeholder="e.g., Pure Acrylic Polymer batch shipment confirmation…"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  required
                  className="h-9 text-xs bg-slate-50 border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Linked Document Code (Optional)</label>
                <Input
                  placeholder="e.g., RFQ-2026-0810, LPO-2026-9842, INV-2026-9842…"
                  value={newLinkedRef}
                  onChange={(e) => setNewLinkedRef(e.target.value)}
                  className="h-9 text-xs font-mono bg-slate-50 border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Message Body *</label>
                <textarea
                  rows={4}
                  placeholder="Type your official inquiry or fulfillment update here…"
                  value={newMessageBody}
                  onChange={(e) => setNewMessageBody(e.target.value)}
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#32298A]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewModal(false)}
                  className="h-9 text-xs border-slate-200 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold gap-1.5 rounded-lg cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start Conversation</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
