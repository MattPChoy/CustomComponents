import { App, ref } from "vue";

export const overlays = ref<ModalData[]>([]);

export class ModalData {
    constructor(component: any, props?: any, onClose?: (cancelPressed: boolean) => void) {
        this.component = component;
        this.props = props;
        this.onClose = onClose ? (onClose) : (() => { });
        this.close = this.close.bind(this); // Bind the close method to the instance
    }

    public id: string = crypto.randomUUID();
    public component: any;
    public props: any;
    //@ts-ignore
    public onClose: (cancelPressed: boolean) => void;

    public close(cancelPressed: boolean = false) {
        overlays.value = overlays.value.filter((o) => o.id !== this.id)

        // Ensure onClose is not recursively triggering close
        const onCloseCallback = this.onClose;
        if (onCloseCallback) onCloseCallback(cancelPressed);
    }
}

function showModal(modal: any, props?: object, onClose?: (cancelPressed: boolean) => void) {
    overlays.value.push(new ModalData(modal, props, onClose));
}

export default {
    //@ts-ignore:unused
    install(app: App) {

    }
}

export { showModal };