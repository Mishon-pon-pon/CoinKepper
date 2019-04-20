/*model*/
export function Category(name, id) {
    this.Name = name;
    this.CategoryId = id;
}

export function Sum(value, categoryId, id) {
    this.id = id;
    this.Value = value;
    this.CategoryId = categoryId;
}