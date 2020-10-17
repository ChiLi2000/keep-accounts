type RootState = {
  disburseTagList: Tag[];
  incomeTagList: Tag[];
  createTagError: Error | null;
}

type Tag = {
  id: string;
  name: string;
  value: string;
}
