import type { Metadata } from "next";
import { MenuPageContent } from "@/components/MenuPageContent";

export const metadata: Metadata = {
  title: "Menu",
  description: "The full Paper Moon menu — appetizers, salads, pizza, mains, desserts and drinks.",
};

export default function MenuPage() {
  return <MenuPageContent />;
}
