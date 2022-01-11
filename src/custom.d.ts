type RecordItem = {
  tags: Tag;
  notes: string;
  type: string;
  amount: number; // 数据类型 object | string
  createdAt: string; // 类 / 构造函数
};

type RootState = {
  recordList: RecordItem[];
  paymentList: Tag[];
  incomeList: Tag[];
  currentTag?: Tag;
  createRecordError: Error | null;
  createTagError: Error | null;
};

type Tag = {
  id: string;
  name: string;
  iconName: string;
  // type: string;//'-','+'

};
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; // 联合类型
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};

// interface Window {}
declare module 'lemon-ui-demo';