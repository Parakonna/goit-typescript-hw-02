export interface Article {
    id: string;
    urls: {
        regular: string;
        small: string;
    }
    description: string | null;
    likes: number;
    user: {
        name: string;
    }
}

export interface ModalImg {
  urls: {
    regular: string;
    small: string;
  };
  description: string | null;
  likes: number;
  author: string;
}