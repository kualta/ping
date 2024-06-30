import { LimitType, PublicationType } from "@lens-protocol/client";
import type { Metadata } from "next";
import { InfiniteScroll } from "~/components/InfiniteScroll";
import { lensItemToPost } from "~/components/post/Post";
import { getLensClient } from "~/utils/getLensClient";
import { getUserByHandle } from "~/utils/getUserByHandle";

export async function generateMetadata({ params }: { params: { user: string } }): Promise<Metadata> {
  const handle = params.user;
  const title = `${handle}`;
  return {
    title,
    description: `@${handle} on Pingpad`,
  };
}

const user = async ({ params }: { params: { user: string } }) => {
  const handle = params.user;
  const { user, posts, nextCursor } = await getInitialData(handle);

  return (
    <InfiniteScroll endpoint={`/api/posts?id=${user.id}&type=post`} initialData={posts} initialCursor={nextCursor} />
  );
};

const getInitialData = async (handle: string) => {
  const { client } = await getLensClient();
  const user = await getUserByHandle(handle);

  if (!user) {
    throw new Error("☆⌒(>。<) User not found");
  }
  
  const lensPosts = await client.publication
    .fetchAll({
      where: { from: [user.id], publicationTypes: [PublicationType.Post] },
      limit: LimitType.Ten,
    })
    .catch(() => {
      throw new Error(`☆⌒(>。<) Couldn't get user posts`);
    });

  const posts = lensPosts.items.map(lensItemToPost);

  return { user, posts, nextCursor: lensPosts.pageInfo.next };
};

export default user;
