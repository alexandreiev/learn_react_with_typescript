import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { PostsPage } from "./posts/PostsPage";
import { getPosts } from "./posts/getPosts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsPage />,
    loader: async () => defer({ posts: getPosts() })
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
