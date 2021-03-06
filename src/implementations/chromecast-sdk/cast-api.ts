let castLoadPromise: Promise<void> = null;

export function getCastAPI(): Promise<void> {
    if (castLoadPromise) {
        return castLoadPromise;
    }

    return castLoadPromise = new Promise<void>((fulfill, reject) => {
        window['__onGCastApiAvailable'] = function (isAvailable) {
            if (isAvailable === false) {
                reject(new Error("Cast API not available"));
            } else {
                fulfill();
            }
        };

        let scriptTag = document.createElement("script");
        scriptTag.setAttribute('src', '//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
        document.head.appendChild(scriptTag);

    });
}