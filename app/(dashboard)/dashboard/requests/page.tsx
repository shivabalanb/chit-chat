import FriendRequests from "@/app/components/FriendRequests";
import { fetchRedis } from "@/app/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = JSON.parse(
        await fetchRedis("get", `user:${senderId}`)
      ) as User;

      return { senderId, senderEmail: sender.email };
    })
  );

  return (
    <main>
      <p>add a friend</p>
      <FriendRequests
        sessionId={session.user.id}
        incomingFriendRequests={incomingFriendRequests}
      />
    </main>
  );
};
export default page;
