import { Category, Sum } from "../Model";
import { vue } from "../View";
import { routers } from "../Routers";

/*controllers*/

/* CategoryController */
export const CategoryController = {
    dataCash: [],
    update: function () {
        for (var i = 0; i < this.dataCash.length; i++) {
            this.dataCash[i]['input'] = 'input';
        }
        vue.categories = this.dataCash;
    },
    load: function (url) {
        routers.get(url)
            .then(categories => {
                if (categories) {
                    for (var i = 0; i < categories.length; i++) {
                        this.dataCash.push(Object.assign(new Category(categories[i].Name, categories[i].CategoryId), new Sum(categories[i].Value, categories[i].CategoryId)));
                    }
                    this.update();
                }
            });
    },
    save: function (url, newCategory) {
        routers.post(url, newCategory)
            .then(category => {
                this.dataCash.push(Object.assign(new Category(newCategory.Name, category.CategoryId), new Sum(0, category.CategoryId)));
                this.update();
            })
    },
    delete: function (url, id) {
        routers.delete(url, id)
            .then(id => {
                for (var i = 0; i < this.dataCash.length; i++) {
                    if (this.dataCash[i].CategoryId == id) {
                        this.dataCash.splice(i, 1);
                        this.update();
                    }
                }
            })
    }
}

export const SumController = {
    save: function (url, newSum) {
        routers.post(url, newSum)
            .then(sum => {
                if (sum) {
                    CategoryController.dataCash.forEach(item => {
                        if (item.CategoryId == sum.CategoryId) {
                            item.Value += sum.Value;
                            CategoryController.update();
                        }
                    })
                    // for(var i = 0; CategoryController.dataCash.length; i++) {
                    //     if(CategoryController.dataCash[i].CategoryId == newSum.CategoryId) {
                    //         CategoryController.dataCash[i].Value += sum.Value;
                    //         CategoryController.update();
                    //     }
                    // }
                }
            });
    }
}

/* SumController */


/*export const controller = {
    _$: function (elementId) {
        return document.getElementById(elementId);
    },
    DomLoad: function () {
        return document.addEventListener("DOMContentLoaded", () => {
            model.getData();
        });
    },
    PushButtonAddCategory: function () {
        this._$('addCategory').addEventListener('click', () => {
            let CategoryName = this._$('categoryName').value;
            model.addNewCat(CategoryName);
            CategoryName = '';
        })
    },
    PushButtonDeleteCategory: function () {
        this._$('body').addEventListener('click', event => {
            if (event.target.getAttribute('button_delete')) {
                let CategoryId = event.target.getAttribute('button_delete');
                model.deleteCat(CategoryId);
            }
        })
    },
    PushButtonAddSum: function () {
        this._$('body').addEventListener('click', event => {
            if (event.target.getAttribute('button_addSum')) {
                let CategoryId = event.target.getAttribute('button_addSum');
                let value = this._$('input' + CategoryId).value;
                model.addSum({ CategoryId: CategoryId, Value: value });
            }
        })
    },
    ClearInputSum: function () {
        this._$('body').addEventListener('click', event => {
            if (event.target.getAttribute('inputCategory')) {
                event.target.value = '';
                // event.target.onblur = function () {
                //     let CategoryId = event.target.getAttribute('inputCategory');
                //     for (let i = 0; i < model.DataCash.length; i++) {
                //         if (model.DataCash[i].CategoryId == CategoryId) {
                //             event.target.value = model.DataCash[i].Value;
                //         }
                //     }
                // }
            }
        });
    },
    init: function() {
        for(var key in controller) {
            if(key !== 'init')
            controller[key]();
        }
    }
}*/