var CategoriesDivContent = new Vue({
    el: '#CategoriesDivContent',
    data: {
        categories: []
    }
})



function _$(selector) {
    return document.getElementById(selector);
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
    for(let i = 0; i < CategoriesDivContent.categories.length; i++) {
        if(CategoriesDivContent.categories[i].CategoryId == id) {
            CategoriesDivContent.categories.splice(i, 1);
        }
    }
};

_$('addCategory').addEventListener('click', function () {
    let CategoryName = _$('categoryName').value;
    Category.CreateCat({
        categoryName: CategoryName
    }).then((res) => {
        addNewCategory(res.CategoryId, CategoryName, 0);
        _$('categoryName').value = '';
    });
    
});

document.addEventListener("DOMContentLoaded", () => {
    UseCategoryData();
});

_$('body').addEventListener('click', (event) => {
    if (event.target.getAttribute('categoryid')) {
        let value = _$('input' + event.target.getAttribute('categoryid')).value;
        Sum.AddSum({
            value: value,
            CategoryId: event.target.getAttribute('categoryid')
        }).then(res => res);
        CategoriesDivContent.categories.forEach((item) => {
            if(item.CategoryId == event.target.getAttribute('categoryid')) {
                item.Value = item.Value + Number(_$('input' + event.target.getAttribute('categoryid')).value)
            }
        });
    }
})

_$('body').addEventListener('click', (event) => {
    if (event.target.getAttribute('inputCategory')) {
        _$('input' + event.target.getAttribute('inputCategory')).value = ''
    }
});

_$('body').addEventListener('click', (event) => {
    if(event.target.getAttribute('button_number')) {
        let CategoryId = event.target.getAttribute('button_number');
        Category.DeleteCat(CategoryId).then(res => {});
        deleteCategory(CategoryId);
    }
});

function UseCategoryData() {
    Category.GetCat().then(category => {
        category.forEach((item) => {
            item.input = 'input';
        })
        CategoriesDivContent.categories = category;
       
    })
}

class Category {
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

class Sum {
    static AddSum(value) {
        return fetch('/sum/new', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res)
    }
}


/*const posts = [];
const HighCData = [];
let inputValue;

const button = document.getElementById('button-addon1');
button.addEventListener('click', CreateNewCat);

const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', addSumCategory);
body.addEventListener('click', deleteCats);


body.addEventListener('click', UpdateCatSumm);

const input = document.getElementsByClassName('form-control');


class CatApi {
    static CreateCat(cat) {
        return fetch('/api/catPost', {
            method: 'Post',
            body: JSON.stringify(cat),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res)
    }
    static DeleteCat(id) {
        return fetch(`/api/catPost/${id}`, {
            method: 'delete'
        }).then(res => res)
    }
};


class PostApi {
    static fetch() {
        return fetch(`/api/post`, {
            method: 'get'
        }).then(res => res.json())
    }
    static create(post) {
        return fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res);
    }
};


const waitBackendPosts = new Promise((resolve, reject) => {
    resolve(PostApi.fetch().then(backendPosts => {
        for (let i = 0; i < backendPosts.length; i++) {
            posts.push(backendPosts[i]);
        };
        return posts;
    }));
});


waitBackendPosts.then(result => {
    renderPosts(result);
    collectsHighChartData();
    Highchart();
    addEventListenerForInput()
}, function(err) {
    console.log(err);
});







function renderPosts(_posts = []) {
    const $posts = document.querySelector('#test');
    if (_posts.length > 0) {
        $posts.innerHTML = _posts.map(post => card(post)).join(' ');
    } else {
        $posts.innerHTML = `<div class="center">Добавте категорию...</div>`;
    }
    collectsHighChartData();
    Highchart();
    addEventListenerForInput()
};


function collectsHighChartData() {
    HighCData.length = 0;
    for (let i = 0; i < posts.length; i++) {
        HighCData.push({
            name: posts[i].CategoryName,
            y: posts[i].cnt
        });
    }
};


function CreateNewCat() {
    let $text = document.getElementById('text');
    const obj = {
        text: $text.value
    }
    CatApi.CreateCat(obj).then(post => {
        PostApi.fetch().then(backendPosts => {
            posts.push(backendPosts[backendPosts.length - 1]);
            renderPosts(posts);
        });
    });
    $text.value = '';
};


function addSumCategory(event) {
    let id = event.target.id
    let input = document.getElementById('input' + id);
    if (input) {
        let obj = {
            val: input.value,
            id: id
        }
        PostApi.create(obj).then(post => {
            posts.push(post);
        });
        PostApi.fetch().then(backendPosts => {
            posts.length = 0;
            for (let i = 0; i < backendPosts.length; i++) {
                posts.push(backendPosts[i]);
            };
            renderPosts(posts)
        });
    }
};


function deleteCats(event) {
    var button_number = +event.target.getAttribute('button_number')
    if (button_number) {
        CatApi.DeleteCat(button_number).then(() => {
            console.log(posts)
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].CategoryId == button_number) {
                    posts.splice(i, 1);
                }
                renderPosts(posts);
            }
        });
    }
};


function Highchart() {
    return Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Отчет по затратам'
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                //colors: color,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
            }
        },
        series: [{
            data: HighCData
        }]
    });
};

function inputValueClear(elem) {
    inputValue = elem.target.value;
    elem.target.value = '';
};

function inputValueComeBack(elem) {
    if (elem.target.value == '') {
        elem.target.value = inputValue;
    }
};

function addEventListenerForInput() {
    for (let i = 1; i < input.length; i++) {
        input[i].addEventListener('focus', inputValueClear);
        input[i].addEventListener('blur', inputValueComeBack);
    }
};

function UpdateCatSumm(event) {
	let operationId = +event.target.getAttribute('deleteOperationId');
	if(operationId) {
		waitBackendPosts.then(result => {
			renderPosts(result);
			collectsHighChartData();
			Highchart();
			addEventListenerForInput()
		}, function(err) {
			console.log(err);
		});
	}
}*/