import recordListModel from "@/Models/recordList";

export default {
    //record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),
}