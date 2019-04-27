import { Category, Sum } from "../Model";
import { vue, vueHistory } from "../View/index";
import { routers } from "../Routers";
import { highChart } from "../View/highcharts";

/*controllers*/

/* CategoryController */
export const CategoryController = {
    dataCache: [],
    update: function () {
        let highChartData = [];
        for (var i = 0; i < this.dataCache.length; i++) {
            this.dataCache[i]['input'] = 'input';
            if (this.dataCache[i].Value !== 0) {
                highChartData.push({ name: this.dataCache[i].Name, y: this.dataCache[i].Value })
            }
        }
        vue.categories = this.dataCache;
        highChart('container', highChartData);
    },
    load: function (url) {
        routers.get(url)
            .then(categories => {
                if (categories) {
                    for (var i = 0; i < categories.length; i++) {
                        this.dataCache.push(Object.assign(new Category(categories[i].Name, categories[i].CategoryId), new Sum(categories[i].Value, categories[i].CategoryId)));
                    }
                    this.update();
                }
            });
    },
    save: function (url, newCategory) {
        routers.post(url, newCategory)
            .then(category => {
                this.dataCache.push(Object.assign(new Category(newCategory.Name, category.CategoryId), new Sum(0, category.CategoryId)));
                this.update();
            })
    },
    delete: function (url, id) {
        routers.delete(url, id)
            .then(id => {
                for (var i = 0; i < this.dataCache.length; i++) {
                    if (this.dataCache[i].CategoryId == id) {
                        this.dataCache.splice(i, 1);
                        this.update();
                    }
                }
            })
    }
}

/* SumController */
export const SumController = {
    dataCache: [],
    update: function (data) {
        this.dataCache = data;
        vueHistory.sums = this.dataCache;
    },
    load: function (url, id) {
        routers.get(url + `/${id}`)
            .then(res => {
                this.update(res);
            });
    },
    save: function (url, newSum) {
        routers.post(url, newSum)
            .then(sum => {
                if (sum) {
                    CategoryController.dataCache.forEach(item => {
                        if (item.CategoryId == sum.CategoryId) {
                            item.Value += sum.Value;
                            CategoryController.update();
                        }
                    });
                }
            });
    },
    delete: function (url, id) {
        routers.delete(url, id)
        .then(res => {
            debugger;
            for(let i = 0; i < this.dataCache.length; i++) {
                if(this.dataCache[i].SumId == res.SumId) {
                    let Value = this.dataCache[i].Value;
                    this.dataCache.splice(i, 1);
                    for(let n = 0; n < CategoryController.dataCache.length; n++) {
                        if(CategoryController.dataCache[n].CategoryId == this.dataCache[0].CategoryId) {
                            CategoryController.dataCache[n].Value -= Value;
                        }
                    }
                }
                this.update(this.dataCache);
                CategoryController.update();
            }
        })
            .catch(err => { if (err) console.log(err) });
    }
}




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
                //     for (let i = 0; i < model.dataCache.length; i++) {
                //         if (model.dataCache[i].CategoryId == CategoryId) {
                //             event.target.value = model.dataCache[i].Value;
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