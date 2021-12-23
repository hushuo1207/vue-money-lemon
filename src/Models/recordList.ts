import clone from "@/lib/clone";

const localStorageKeyName = 'recordList';

const recordListModel = {
    data: [] as RecordItem[],
    
    create(record: RecordItem){
        /* @ts-ignore */
        const record2: RecordItem = clone(this.record);
        /* @ts-ignore */
        record2.createAt = new Date();
        this.data.push(record2);
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data;
        
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};
export default recordListModel;