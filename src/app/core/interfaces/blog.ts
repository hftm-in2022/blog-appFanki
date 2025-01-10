export interface Blog {
  id: number;
  title: string;
  contentPreview: string;
  author: string;
  likes: number;
  comments: number; // Array von Kommentaren
  likedByMe: boolean;
  createdByMe: boolean;
  headerImageUrl?: string; // optional
}

export interface BlogResponse {
  data: Blog[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  maxPageSize: number;
}
