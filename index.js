class Fetcher {
    constructor(url) {
        this.url = url;
    }

    async getData() {
        let response = await axios.get(this.url)

        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        this._data = response.data.results;
        return this._data;
    }

    async drawElements() {
        if (!this._data) {
            //console.log(this._data)
            await this.getData();
        }
        this.addElement(this._data);
    }

    addElement(data) {
        for (let i of data) {
            const newBtn = document.createElement("button");
            newBtn.innerHTML = `нажми меня`;
            newBtn.classList.add("btn_table");
            const newTR = document.createElement("tr");
            newTR.classList.add('tr_table');
            newTR.innerHTML = `<td>${i.name}</td><td>${i.height}</td><td>${i.mass}</td>`;
            const tableElement = document.getElementById("table");
            newTR.append(newBtn);
            tableElement.append(newTR);
            const person = new Person(i.name);

            newBtn.addEventListener("click", person.sayMyName);
        }
    }
}

class Person {
    constructor(dataName) {
        this._dataName = dataName;
    }

    sayMyName = () => {
        alert('мое имя' + this._dataName)
    }

}

const fetcher = new Fetcher("https://swapi.dev/api/people");
fetcher.drawElements();
