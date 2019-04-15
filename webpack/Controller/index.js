import { model } from '../Model/index'

export const controller = {
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
    }
}