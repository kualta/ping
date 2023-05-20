import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { UserAvatar } from "./UserAvatar";

export default function PostWizard() {
  const [input, setInput] = useState("");
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      ctx.posts.invalidate();
    },
    onError: (e) => {
      let error = "Something went wrong";
      switch (e.data?.code) {
        case "UNAUTHORIZED":
          error = "You must be logged in to post";
          break;
        case "FORBIDDEN":
          error = "You are not allowed to post";
          break;
        case "TOO_MANY_REQUESTS":
          error = "Slow down! You are posting too fast";
          break;
        case "BAD_REQUEST":
          error = "Invalid request";
          break;
        case "PAYLOAD_TOO_LARGE":
          error = "Your message is too big";
          break;
      }
      toast.error(error);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ content: input });
  };

  const postButton = isPosting ? (
    <>
      <div className="btn-outline loading btn w-16"></div>
    </>
  ) : (
    <>
      {input !== "" && (
        <button className="btn-outline btn-primary btn w-16" type="submit">
          Twot
        </button>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-10 flex flex-col ">
      <div className="z-10 flex flex-row gap-4 bg-base-100 p-4">
        <UserAvatar />
        <form className="flex w-full flex-row gap-4" onSubmit={onSubmit}>
          <input
            type="text"
            className="input-bordered input-ghost input shrink grow"
            placeholder="write a new twot?.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPosting}
          />
          {postButton}
        </form>
      </div>
      <div
        className="divider m-0 mb-2 bg-base-100/[.5] 
                  before:h-0 before:border-b before:border-base-300 before:bg-base-300 
                  after:h-0 after:border-b after:border-base-300 after:bg-base-300"
      >
        Global
      </div>
    </div>
  );
}
