function containsChinese(text: string) {
    const pattern = /[\u4e00-\u9fa5]/; // Unicode 范围：中文字符的起始值（0x4e00）到结束值（0x9fa5）
    return pattern.test(text);
}

export function clipSelectedText(selectedText: string): string {
    let viewSelectedText = selectedText;
    if (viewSelectedText !== null) {
        const haveChinese: boolean = containsChinese(viewSelectedText);
        const limitLength: number = haveChinese ? 80 : 150;
        if (viewSelectedText?.length > limitLength) {
            viewSelectedText = viewSelectedText?.substring(0, limitLength) + '......';
        }
    }
    return viewSelectedText;
}

// the key of storage data in local
export const KEY_TEXT_LIST = 'text_list';

export const INIT_TEMPLATE_CONTENT = '[url]\n<[group_name]>\n\n >>> [snippet]\n\n >>> [note]';

export function formatDataToText(contentList: object[]) {
    let formattedText = "";

    contentList.forEach(content => {
        let snippetList: object[] = content;
        if (snippetList.length > 0) {
            let title: string = snippetList[0].title;
            formattedText += '>>> ' + title;
        }
        snippetList.forEach(snippet => {
            let selectedText: string = snippet.selected_text;
            let inputText: string = snippet.input_text;

            let tmpObject: string = "";
            tmpObject += "\n";
            tmpObject += selectedText;
            if (inputText !== undefined && inputText !== "") {
                tmpObject += "\n";
                tmpObject += inputText;
            }
            tmpObject += "\n";

            formattedText += tmpObject;
        });
        formattedText += "\n\n";
    });

    return formattedText;
}