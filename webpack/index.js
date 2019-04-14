import {Category} from './Category/index';
import {CategoriesDivContent} from './Vue/index';
import {Sum} from './Sum/index';
import {renderHigChart} from './HighCharts/index'

document.addEventListener("DOMContentLoaded", () => {
    UseCategoryData();
});

_$('addCategory').addEventListener('click', function () {
    let CategoryName = _$('categoryName').value;
    Category.CreateCat({
        categoryName: CategoryName
    }).then((res) => {
        addNewCategory(res.CategoryId, CategoryName, 0);
        _$('categoryName').value = '';
    });

});

_$('body').addEventListener('click', (event) => {
    if (event.target.getAttribute('categoryid')) {
        let value = _$('input' + event.target.getAttribute('categoryid')).value;
        Sum.AddSum({
            value: value,
            CategoryId: event.target.getAttribute('categoryid')
        }).then(res => res);
        CategoriesDivContent.categories.forEach((item) => {
            if (item.CategoryId == event.target.getAttribute('categoryid')) {
                item.Value = item.Value + Number(_$('input' + event.target.getAttribute('categoryid')).value)
            }
        });
        renderHigChart(CategoriesDivContent.categories)
    }
})

_$('body').addEventListener('click', (event) => {
    if (event.target.getAttribute('inputCategory')) {
        _$('input' + event.target.getAttribute('inputCategory')).value = ''
    }
});

_$('body').addEventListener('click', (event) => {
    if (event.target.getAttribute('button_number')) {
        let CategoryId = event.target.getAttribute('button_number');
        Category.DeleteCat(CategoryId).then(res => { });
        deleteCategory(CategoryId);
    }
});

function _$(elementId) {
    return document.getElementById(elementId);
}

function addNewCategory(id, name, value) {
    CategoriesDivContent.categories.push({
        CategoryId: id,
        Name: name,
        input: 'input',
        Value: value
    });
};

function deleteCategory(id) {
    for (let i = 0; i < CategoriesDivContent.categories.length; i++) {
        if (CategoriesDivContent.categories[i].CategoryId == id) {
            CategoriesDivContent.categories.splice(i, 1);
        }
    }
    renderHigChart(CategoriesDivContent.categories)
};

function UseCategoryData() {
    Category.GetCat().then(category => {
        category.forEach((item) => {
            item.input = 'input';
        })
        CategoriesDivContent.categories = category;
        renderHigChart(category)
    })
}