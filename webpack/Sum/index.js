export class Sum {
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