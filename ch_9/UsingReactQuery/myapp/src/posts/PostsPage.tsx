import { NewPostData, PostData } from "./types";
import { assertIsPosts, getPosts } from "./getPosts";
import { PostsList } from "./PostsList";
import { NewPostForm } from "./NewPostForm";
import { savePost } from "./savePost";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Data = {
  posts: PostData[];
};
export function assertIsData(data: unknown): asserts data is Data {
  if (typeof data !== "object") {
    throw new Error("Data isn't an object");
  }
  if (data === null) {
    throw new Error("Data is null");
  }
  if (!("posts" in data)) {
    throw new Error("data doesn't contain posts");
  }
}

export function PostsPage() {
  // const data = useLoaderData();
  // assertIsData(data);

  // const { isLoading, data: posts } = useQuery({
  //   queryKey: ["postsData"],
  //   queryFn: getPosts
  // });
  const {
    isLoading,
    isFetching,
    data: posts
  } = useQuery({ queryKey: ["postsData"], queryFn: getPosts });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: savePost,
    onSuccess: (savedPost) => {
      queryClient.setQueryData<PostData[]>(["postsData"], (oldPosts) => {
        if (oldPosts === undefined) {
          return [savedPost];
        } else {
          return [savedPost, ...oldPosts];
        }
      });
    }
  });

  if (isLoading || posts === undefined) {
    return <div className="w-96 mx-auto mt-6">Loading...</div>;
  }

  return (
    <div className="w-96 mx-auto mt-6">
      <h2 className="text-xl text-slate-900 font-bold">Posts</h2>
      <NewPostForm onSave={mutate} />
      {isFetching ? <div>Fetching...</div> : <PostsList posts={posts} />}
      {/* <Suspense fallback={<div> Fetching... </div>}>
        <Await resolve={data.posts}>
          {(posts) => {
            assertIsPosts(posts);
            return <PostsList posts={posts} />;
          }}
        </Await>
      </Suspense> */}
    </div>
  );
}
