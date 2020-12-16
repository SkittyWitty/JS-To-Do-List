export default class ToDoItem {
    constructor(id, item){
        this._id = id;
        this._item = item;
    }


    getId(){
        return this._id;
    }

    setId(id){
        this._id = id;
    }

    getItem(){
        return this._item;
    }

    setItem(item){
        this._item = item;
    }
}