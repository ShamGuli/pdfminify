"use client";

import dynamic from "next/dynamic";

const AdminHeader = dynamic(() => import("./AdminHeader"), {
  ssr: false,
  loading: () => (
    <div className="border-b border-slate-200 bg-white" style={{ minHeight: 56 }} />
  ),
});

export default function AdminHeaderWrapper() {
  return <AdminHeader />;
}
