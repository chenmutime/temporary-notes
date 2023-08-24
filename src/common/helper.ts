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