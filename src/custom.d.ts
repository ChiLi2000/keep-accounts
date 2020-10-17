type RootState = {
  tagList: Tag[];
  createTagError: Error | null;
}

type Tag = {
  id: string;
  name: string;
  value: string;
}
