import { SnnipetObject } from "./SnippetObject";

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

function formartMarkdownText(title: string = '', url: string, snippetList: SnnipetObject[]) :string { 
    let content = '';
    if (title !== '') { 
        content += '## ' + title + '\n';
        content += '#### ' + url + '\n';
    } else {
        content += '## ' + url + '\n';
    }
    snippetList.forEach(snippet => { 
        content += '> ' + snippet.selected_text + '\n';
        content += '\n'
        if (snippet.input_text) {
            content += '**' + snippet.input_text + '** \n';
        } else { 
            content += '\n'
        }
    });
    content += '\n';

    return content;
}

export function formatDataToText(contentList: object[], template: string) {
    let formattedText = '\n';

    contentList.forEach(content => {
        const snippetList: object[] = content;
        console.log('sss: ', JSON.stringify(snippetList));
        let title: string;
        let url: string;
        if (snippetList.length > 0) { 
            url = snippetList[0].url;
            title = snippetList[0].title === url ? '' : snippetList[0].title;

            if (template === 'Markdown') {
                formattedText += formartMarkdownText(title, url, snippetList);
            } else if (template === 'Notion') {

            } else if (template === 'PlainText') {
                // 保存纯文本的话则需要去除HTML标识符

            } else { 
                formattedText += formartMarkdownText(title, url, snippetList);
            }

            formattedText += "\n";
        }

    });

    return formattedText;
}

export function formartSnippetToText(snippet: object) {
    return snippet.url + '\n\n' + snippet.selected_text + '\n\n' + (snippet.input_text ? snippet.input_text:'');
}

export function removeHtmlTags(html) {
    html = html.replace(/<br>/g, '\n');
    html = html.replace(/<p>/g, '\n');
    return html.replace(/(<([^>]+)>)/ig, "");
}
