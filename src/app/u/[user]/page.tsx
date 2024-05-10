import { PublicationType } from "@lens-protocol/client";
import { CalendarIcon, EditIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ErrorPage from "~/components/ErrorPage";
import { Feed } from "~/components/Feed";
import { TimeSince } from "~/components/TimeLabel";
import { UserAvatar } from "~/components/UserAvatar";
import { lensItemToPost } from "~/components/post/Post";
import { lensProfileToUser } from "~/components/user/User";
import { getLensClient } from "~/utils/getLensClient";

export async function generateMetadata({ params }: { params: { user: string } }): Promise<Metadata> {
  const handle = params.user;
  const title = `${handle} | Pingpad`;
  return {
    title,
    description: `@${handle} on Pingpad`,
  };
}

const user = async ({ params }: { params: { user: string } }) => {
  const { client, isAuthenticated, profileId } = await getLensClient();

  const handle = params.user;
  const profile = await client.profile.fetch({
    forHandle: `lens/${handle}`,
  });
  if (!profile) return <ErrorPage title="∑(O_O;) Not Found" />;

  const data = await client.publication.fetchAll({
    where: { from: [profile.id], publicationTypes: [PublicationType.Post] },
  });
  if (!data) return <ErrorPage title={`Couldn't fetch posts`} />;

  const posts = data.items?.map((publication) => lensItemToPost(publication)).filter((post) => post);

  const isUserProfile = false;

  return (
    <>
      <div className="sticky top-0 p-4 z-20 flex w-full flex-row gap-4 border-b border-base-300 bg-base-200/30 bg-card rounded-b-lg drop-shadow-md">
        <div className="flex shrink-0 grow-0 w-12 h-12 sm:w-24 sm:h-24">
          <UserAvatar user={lensProfileToUser(profile)} />
        </div>

        <div className="flex flex-col grow place-content-around">
          <div className="flex flex-row gap-2 place-items-center h-6">
            <div className="text-lg font-bold w-fit truncate">{profile.metadata.displayName}</div>
            {isUserProfile && (
              <Link className="btn btn-square btn-sm btn-ghost" href="/settings">
                <EditIcon size={14} />
              </Link>
            )}
          </div>
          <Link className="grow" href={`/${profile.handle.localName}`}>
            <div className="text-sm text-base-content font-light">@{profile.handle.localName}</div>
          </Link>
          <div className="text-sm text-base-content grow">{profile.metadata.bio}</div>
          <div className="text-sm text-base-content flex flex-row gap-1 place-items-center">
            <CalendarIcon size={14} />
            Joined <TimeSince date={new Date(profile.createdAt)} />
          </div>
        </div>
      </div>

      <Feed data={posts} />
    </>
  );
};

export default user;