type RootState = {
  disburseTagList: Tag[];
  incomeTagList: Tag[];
  recordList: RecordItem[];
  createRecordError: Error | null;
  createTagError: Error | null;
}

type Tag = {
  id: string;
  name: string;
  value: string;
}

type RecordItem = {
  tag: Tag;
  note: string;
  type: string;
  amount: number;
  createAt: string;
}

type Result = {
  title: string;
  disburseTotal?: number;
  incomeTotal?: number;
  items: RecordItem[];
}[]

type mouthResult = {
  title: string;
  disburseTotal?: number;
  incomeTotal?: number;
  items: Result;
}[]

