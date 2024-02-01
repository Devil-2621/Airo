import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-4">
      Hello
      <div>
        <UserButton />
      </div>
    </main>
  );
}
