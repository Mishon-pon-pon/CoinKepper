export class Category {
    static GetCat() {
        return fetch('/category/exist', {
            method: 'GET'
        }).then(res => res.json());
    }
    static CreateCat(cat) {
        return fetch('/category/new', {
            method: 'POST',
            body: JSON.stringify(cat),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }
    static DeleteCat(id) {
        return fetch(`/category/delete/${id}`, {
            method: 'delete'
        }).then(res => res)
    }
};