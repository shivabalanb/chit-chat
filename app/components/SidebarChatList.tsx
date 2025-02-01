"use client";
import { chatHrefConstructor } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SidebarChatList = ({
  sessionId,
  friends,
}: {
  sessionId: string;
  friends: User[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <div className=" max-h-[25rem] overflow-y-auto">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((msg) => {
          return msg.senderId === friend.id;
        }).length;
        return (
          <p key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
            >
              {friend.name}
              {unseenMessagesCount > 0 && (
                <span className="text-sm text-zinc-400">
                  {" "}
                  ({unseenMessagesCount})
                </span>
              )}
            </a>
          </p>
        );
      })}
    </div>
  );
};
export default SidebarChatList;
