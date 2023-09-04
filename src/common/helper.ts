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

export const DEFAULT_TEMPLATE_CONTENT = '## Group name: [group_name]\n### [url]\n> snippet: [snippet]\n\n> note: [note]';

function formatSnippetText(title: string = 'N/A',url: string, snippet: string, note: string = 'N/A', templateContent: string = DEFAULT_TEMPLATE_CONTENT): string {
    const formattedText = templateContent;
    return formattedText
        .replaceAll('[group_name]', title)
        .replaceAll('[url]', url)
        .replaceAll('[snippet]', snippet)
        .replaceAll('[note]', note)
        ;
}

export function formatDataToText(contentList: object[], templateContent: string) {
    let formattedText = '\n';

    contentList.forEach(content => {
        let snippetList: object[] = content;
        snippetList.forEach(snippet => {
            let title: string = snippet.url === snippet.title? 'N/A' : snippet.title;
            formattedText += formatSnippetText(title, snippet.url, snippet.selected_text, snippet.input_text, templateContent) + '\n\n';
        });

        formattedText += "\n";
    });

    return formattedText;
}
