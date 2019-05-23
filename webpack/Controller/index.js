import { Category, Sum } from "../Model";
import { vue, vueHistory } from "../View/index";
import { routers } from "../Routers";
import { highChart } from "../View/highcharts";

/*controllers*/

/* CategoryController */
export const CategoryController = {
    dataCache: [],
    update: function (data) {
        let highChartData = [];
        for (var i = 0; i < data.length; i++) {
            data[i]['input'] = 'input';
            if (data[i].Value !== 0) {
                highChartData.push({ name: data.Name, y: data[i].Value })
            }
        }
        vue.categories = data;
        highChart('container', highChartData);
    },
    load: function (url) {
        routers.get(url)
            .then(categories => {
                if (categories) {
                    for (var i = 0; i < categories.length; i++) {
                        this.dataCache.push(Object.assign(new Category(categories[i].Name, categories[i].CategoryId), new Sum(categories[i].Value, categories[i].CategoryId)));
                    }
                    this.update(this.dataCache);
                }
            });
    },
    save: function (url, newCategory) {
        routers.post(url, newCategory)
            .then(category => {
                this.dataCache.push(Object.assign(new Category(newCategory.Name, category.CategoryId), new Sum(0, category.CategoryId)));
                this.update(this.dataCache);
            })
    },
    delete: function (url, id) {
        routers.delete(url, id)
            .then(id => {
                for (var i = 0; i < this.dataCache.length; i++) {
                    if (this.dataCache[i].CategoryId == id) {
                        this.dataCache.splice(i, 1);
                        this.update(this.dataCache);
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
                        }
                    });
                }
                CategoryController.update(CategoryController.dataCache);
            });
    },
    delete: function (url, id) {
        routers.delete(url, id)
            .then(res => {
                for (let i = 0; i < this.dataCache.length; i++) {
                    if (this.dataCache[i].SumId == res.SumId) {
                        let Value = this.dataCache[i].Value;
                        this.dataCache.splice(i, 1);
                        for (let n = 0; n < CategoryController.dataCache.length; n++) {
                            if (CategoryController.dataCache[n].CategoryId == this.dataCache[0].CategoryId) {
                                CategoryController.dataCache[n].Value -= Value;
                            }
                        }
                    }
                    this.update(this.dataCache);
                    CategoryController.update(CategoryController.dataCache);
                }
            })
            .catch(err => { if (err) console.log(err) });
    }
}