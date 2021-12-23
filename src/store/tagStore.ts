import tagListModel from "@/Models/tagListModel";


export default {
        
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