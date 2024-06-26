import { PostSuspense } from "./post/PostSuspense";

export const FeedSuspense = () => {
  // biome-ignore lint/suspicious/noArrayIndexKey: intended behavior
  return [...Array(12)].map((_v, idx) => <PostSuspense key={`suspense-${idx}`} />);
};
