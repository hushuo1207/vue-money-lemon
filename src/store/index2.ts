import tagListModel from '@/Models/tagListModel'
import recordListModel from '@/Models/recordList'


const store = {
    //record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),
    //全局變量太多
    //严重依赖window
    
    //Tag store
    tagList: tagListModel.fetch(),
    findTag(id: string) {
      return this.tagList.filter(t => t.id === id)[0];
    },
    createTag: (name: string) => {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
          window.alert('重复标签');
      }else{
          window.alert('添加成功');
          
      }
    },
    removeTag: (id: string) =>{
      return tagListModel.remove(id);
    },
    updateTag:(id: string, name: string) =>{
      return tagListModel.update(id, name);
    }
    
}
export default store;