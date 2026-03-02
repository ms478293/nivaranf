"use server";

import { supabaseAdmin } from "@/lib/supabase/server";

export type MessageRecord = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
};

export async function getMessages(): Promise<{
  data: MessageRecord[];
  error?: string;
}> {
  try {
    const { data, error } = await supabaseAdmin
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch messages error:", error);
      return { data: [], error: error.message };
    }

    return { data: data || [] };
  } catch (err: any) {
    console.error("getMessages error:", err);
    return { data: [], error: err?.message || "Failed to load messages." };
  }
}

export async function updateMessageStatus(
  id: string,
  status: "unread" | "read" | "replied"
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin
      .from("messages")
      .update({ status })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update status." };
  }
}

export async function deleteMessage(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin
      .from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete message." };
  }
}
