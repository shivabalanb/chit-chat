import FriendRequestWidget from "@/app/components/FriendRequestWidget";
import SignOutButton from "@/app/components/SignOutButton";
import { fetchRedis } from "@/app/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

interface SidebarOption {
  id: number;
  name: string;
  href: string;
}

const sidebarOptions: SidebarOption[] = [
  { id: 1, name: "dashboard", href: "/dashboard" },
  { id: 2, name: "add friend", href: "/dashboard/add" },
];

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as string[]
  ).length;

  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-xs grow overflow-y-auto flex-col ">
        <div>
          <p>your chats</p>
          <nav className="flex flex-col">
            <ul>chats the user has</ul>
          </nav>
        </div>
        <div className="flex flex-col bg-slate-50">
          {sidebarOptions.map((option) => (
            <Link key={option.id} href={option.href}>
              {option.name}
            </Link>
          ))}
        </div>
        <FriendRequestWidget
          sessionId={session.user.id}
          initialUnseenRequestCount={unseenRequestCount}
        />
        <div className="mt-auto">
          <div className="relative h-8 w-8">
            <Image
              fill
              referrerPolicy="no-referrer"
              className="rounded-full"
              src={session.user.image || ""}
              alt="your profile pic"
            />{" "}
          </div>{" "}
          <SignOutButton />
        </div>
      </div>
      {children}
    </div>
  );
}
