interface Parameters {
    html: string | undefined;
    onError: () => void;
    target: HTMLElement;
}

function copyScriptAttributes(source: HTMLScriptElement, target: HTMLScriptElement) {
    Array.from(source.attributes).forEach(({ name, value }) => {
        target.setAttribute(name, value);
    });
    // eslint-disable-next-line no-param-reassign
    target.innerText = source.innerText;
}

export function injectOembedMarkup({ html, onError, target }: Parameters): void {
    const container = document.createElement('div');
    container.innerHTML = html || '';
    const embedScripts = Array.from(container.getElementsByTagName('script'));

    embedScripts.forEach((embedScript) => {
        const script = document.createElement('script');
        copyScriptAttributes(embedScript, script);
        script.addEventListener('error', onError);

        document.body.appendChild(script);
        // Remove the original script so it's not loaded twice.
        embedScript.remove();
    });

    // eslint-disable-next-line no-param-reassign
    target.innerHTML = container.innerHTML;
}
