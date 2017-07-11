export function changeMetaDescription(content) {
    let descriptionElement = document.querySelector('meta[name=description]');
    if (descriptionElement) {
        descriptionElement.setAttribute("content", content);
    }
}