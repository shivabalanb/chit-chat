"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests = ({
  incomingFriendRequests,
}: // sessionId,
FriendRequestsProps) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accept", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <p>no friend requests</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId}>
            <p>{request.senderEmail}</p>
            <button
              className="btn bg-green-500"
              onClick={() => acceptFriend(request.senderId)}
            >
              accept
            </button>
            <button
              className="btn  bg-red-500"
              onClick={() => denyFriend(request.senderId)}
            >
              deny
            </button>
          </div>
        ))
      )}
    </>
  );
};
export default FriendRequests;
