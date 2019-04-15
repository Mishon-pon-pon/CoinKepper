import { view } from "../View";

export const model = {
    DataCash: [],
    GetCat: function () {
        return fetch('/category/exist', {
            method: 'GET'
        }).then(res => res.json());
    },
    CreateCat: function (cat) {
        return fetch('/category/new', {
            method: 'POST',
            body: JSON.stringify(cat),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    DeleteCat: function (id) {
        return fetch(`/category/delete/${id}`, {
            method: 'delete'
        }).then(res => res)
    },
    AddSum: function(value) {
        return fetch('/sum/new', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res)
    },
    getData: function () {
        this.GetCat().then(categories => {
            categories.forEach(item => {
                item.input = 'input';
            });
            this.DataCash = categories;
            this.renderDataForVue();
            this.renderDataForHighChart();
        })
    },
    renderDataForVue: function () {
        view.vue.updateVue(this.DataCash)
    },
    renderDataForHighChart: function () {
        let chartData = [];
        this.DataCash.forEach(item => {
            chartData.push({ name: item.Name, y: item.Value });
        });
        view.highchart.updateHighCart(chartData);
    },
    addNewCat: function(CategoryName) {
        this.CreateCat({
            categoryName: CategoryName
        }).then(newCategory => {
            this.DataCash.push({
                CategoryId: newCategory.CategoryId,
                Name: newCategory.Name,
                input: 'input',
                Value: newCategory.Value
            });
            view.vue.updateVue(this.DataCash);
        })
    },
    deleteCat: function (CategoryId) {
        this.DeleteCat(CategoryId).then(res => res);
        for(let i = 0; i < this.DataCash.length; i++) {
            if(this.DataCash[i].CategoryId == CategoryId) {
                this.DataCash.splice(i, 1);
            }
        }
        this.renderDataForHighChart();
        this.renderDataForVue();
    },
    addSum: function(objSum) {
        this.AddSum({
            Value: objSum.Value,
            CategoryId: objSum.CategoryId
        }).then(res => res);
        for(let i = 0; i < this.DataCash.length; i++) {
            if(this.DataCash[i].CategoryId == objSum.CategoryId) {
                this.DataCash[i].Value = this.DataCash[i].Value + Number(objSum.Value);
            }
        }
        this.renderDataForHighChart();
        this.renderDataForVue();
    }
}