let castLoadPromise: Promise<void> = null;

export function getReceiverAPI(): Promise<void> {
    if (castLoadPromise) {
        return castLoadPromise;
    }

    return castLoadPromise = new Promise<void>((fulfill, reject) => {
        let scriptTag = document.createElement("script");
        scriptTag.onload = function () {
            fulfill();
        }
        scriptTag.onerror = function (error) {
            reject(error);
        }
        scriptTag.setAttribute('src', '//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js');
        document.head.appendChild(scriptTag);

    });
}