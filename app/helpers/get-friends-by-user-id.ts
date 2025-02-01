import { fetchRedis } from "./redis";

export const getFriendsByUserId = async (userId: string) => {
  // retrieve friends for user
  const friendIds = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`
  )) as string[];

  const friends = await Promise.all(
    friendIds.map(async (id) => {
      const friend = await fetchRedis("get", `user:${id}`);
      return JSON.parse(friend);
    })
  );

  return friends;
};
