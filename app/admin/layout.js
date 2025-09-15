"use client";

import { AdminProvider } from "@/contexts/admin-context";
import { MediaProvider } from "@/contexts/media-context";
import { MessagesProvider } from "@/contexts/messages-context";

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <MediaProvider>
        <MessagesProvider>
          {children}
        </MessagesProvider>
      </MediaProvider>
    </AdminProvider>
  );
}
