import { CategoryController, SumController } from "./Controller";
import { Category, Sum } from "./Model";

document.addEventListener("DOMContentLoaded", () => {
    CategoryController.load('/category/exist');
});

document.getElementById('addCategory').addEventListener('click', () => {
    let CategoryName = document.getElementById('categoryName').value;
    CategoryController.save('/category/new', new Category(CategoryName, null));
    document.getElementById('categoryName').value = '';
});

document.getElementById('body').addEventListener('click', event => {
    if (event.target.getAttribute('button_delete')) {
        let CategoryId = event.target.getAttribute('button_delete');
        CategoryController.delete('/category/delete', CategoryId);
    }
    if (event.target.getAttribute('button_addSum')) {
        let CategoryId = event.target.getAttribute('button_addSum');
        let Value = document.getElementById('input' + CategoryId).value;
        SumController.save('/sum/new', new Sum(Value, CategoryId))
        document.getElementById('input' + CategoryId).value = '';
    }
    if(event.target.getAttribute('button_getSumHistory')) {
        let CategoryId = event.target.getAttribute('button_getSumHistory');
        SumController.load('/sum/category', CategoryId);
    }
});

