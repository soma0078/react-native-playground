# API 연동 예제

## useQuery 예제

```typescript
// src/features/posts/queries/usePosts.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>("/api/posts");
  return response.data;
};

export const usePosts = () => {
  return useQuery<Post[], Error>(["posts"], fetchPosts, {
    staleTime: 5 * 60 * 1000,
  });
};
```

## useMutation 예제

```typescript
// src/features/posts/queries/useCreatePost.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface NewPostInput {
  title: string;
  body: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

export const createPost = async (newPostData: NewPostInput): Promise<Post> => {
  const response = await axios.post<Post>("/api/posts", newPostData);
  return response.data;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, NewPostInput>(
    (newPostData) => createPost(newPostData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    },
  );
};
```

## 컴포넌트에서 사용

```typescript
// 데이터 조회
const { data: posts, isLoading, error } = usePosts();

// 데이터 생성
const createPostMutation = useCreatePost();
createPostMutation.mutate({ title, body });
```
