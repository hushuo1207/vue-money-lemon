type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型 object | string
    createdAt: String  // 类 / 构造函数
}

type RootState = {
    recordList: RecordItem[],
      tagList: Tag[],
      currentTag?: Tag
  }
  

type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated' // 联合类型
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}

interface Window  {

}