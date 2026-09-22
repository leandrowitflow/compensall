import { notFound } from "next/navigation";

export default function CatchAllUnknownRoute() {
  notFound();
}
