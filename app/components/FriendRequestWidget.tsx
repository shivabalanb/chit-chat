"use client";
import Link from "next/link";
import { useState } from "react";

interface FriendRequestWidgetProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}

const FriendRequestWidget = ({
  sessionId,
  initialUnseenRequestCount,
}: FriendRequestWidgetProps) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState(
    initialUnseenRequestCount
  );
  return (
    <Link href="/dashboard/requests">friend requests {unseenRequestCount}</Link>
  );
};
export default FriendRequestWidget;
