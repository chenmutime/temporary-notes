
export class SnnipetObject {
    url: string;
    title: string;
    selected_text: string;
    input_text: string;
    timestamp: number;

    constructor(url: string, title: string, selectedText: string, inputText: string) {
        this.url = url;
        this.title = title;
        this.selected_text = selectedText;
        this.input_text = inputText;
        this.timestamp = Date.now();
    }

    getUrl() {
        return this.url;
    }
    getTitle() {
        return this.title;
    }
    getSelectedText() {
        return this.selected_text;
    }
    getInputText() {
        return this.input_text;
    }

}