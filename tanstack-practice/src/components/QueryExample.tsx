import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

async function fetchPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  return res.json() as Promise<Post[]>;
}

const QueryExample = () => {
  const [loadData, setLoadData] = useState(false);
  const {
    data: posts,
    isLoading,
    error,
    refetch
  } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts, enabled: loadData });
  return (
    <section>
      <h2>These are the posts</h2>
      {isLoading && <p>Loading....</p>}
      {error && <p>Something went wrong</p>}

      <button onClick={() => setLoadData(true)}>Load Data</button>
      <button onClick={() => refetch()}>Refetch</button>

      {posts &&
        posts.map((post:Post) => (
          <div key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
    </section>
  );
};

export default QueryExample;
