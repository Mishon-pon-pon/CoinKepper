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
        if(Value) {
            SumController.save('/sum/new', new Sum(Value, CategoryId))
            document.getElementById('input' + CategoryId).value = '';
        }
    }
    if(event.target.getAttribute('button_getSumHistory')) {
        let CategoryId = event.target.getAttribute('button_getSumHistory');
        SumController.load('/sum/category', CategoryId);
    }
    if(event.target.getAttribute('button_rowEdit')) {
        let SumId = event.target.getAttribute('button_rowEdit');
        $('[button_rowEdit = "' + SumId + '"]').toggle('hiden');
        $('[button_rowSave = "' + SumId + '"]').toggle('hiden');
        // $('[editRow_spanDate = "' + SumId + '"]').toggle('hiden');
        // $('[editRow_spanValue = "' + SumId + '"]').toggle('hiden');
        // $('[editRow_inputDate = "' + SumId + '"]').toggle('hiden');
        // $('[editRow_inputValue = "' + SumId + '"]').toggle('hiden');
        let date =  $('[editRow_spanDate = "' + SumId + '"]').text();
        let value = $('[editRow_spanValue = "' + SumId + '"]').text();
        // $('[editRow_inputDate = "' + SumId + '"]').val(date);
        // $('[editRow_inputValue = "' + SumId + '"]').val(value);
        $('[editRow_inputDate = "' + SumId + '"]').prop('disabled', false);
        $('[editRow_inputValue = "' + SumId + '"]').prop('disabled', false);
    }
    if(event.target.getAttribute('button_rowSave')) {
        let SumId = event.target.getAttribute('button_rowSave');
        $('[button_rowEdit = "' + SumId + '"]').toggle('hiden');
        $('[button_rowSave = "' + SumId + '"]').toggle('hiden');
        // $('[editRow_spanDate = "' + SumId + '"]').toggle('hiden');
        // $('[editRow_spanValue = "' + SumId + '"]').toggle('hiden');
        // $('[editRow_inputDate = "' + SumId + '"]').toggle('hiden');
        // $('[editRow_inputValue = "' + SumId + '"]').toggle('hiden');
        $('[editRow_inputDate = "' + SumId + '"]').prop('disabled', true);
        $('[editRow_inputValue = "' + SumId + '"]').prop('disabled', true);
    }
    if(event.target.getAttribute('button_deleteSum')) {
        let SumId = event.target.getAttribute('button_deleteSum');
        SumController.delete('/sum/delete', SumId);
    }
});

