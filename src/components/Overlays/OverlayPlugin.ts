import { App, ref } from "vue";

export const overlays = ref<ModalData[]>([]);

export class ModalData {
    constructor(component: any, props?: any, onClose?: (cancelPressed: boolean, data?: any) => void) {
        this.component = component;
        this.props = props;
        this.onClose = onClose ? onClose : (() => { });
        this.close = this.close.bind(this); // Bind the close method to the instance
    }

    public id: string = crypto.randomUUID();
    public component: any;
    public props: any;
    //@ts-ignore
    public onClose: (cancelPressed: boolean, data?: any) => void;

    public close(cancelPressed: boolean = false, data?: any) {
        overlays.value = overlays.value.filter((o) => o.id !== this.id)

        // Ensure onClose is not recursively triggering close
        const onCloseCallback = this.onClose;
        if (onCloseCallback) onCloseCallback(cancelPressed, data);
    }
}

function showModal(modal: any, props?: object, onClose?: (cancelPressed: boolean, data?: any) => void) {
    overlays.value.push(new ModalData(modal, props, onClose));
}

export default {
    //@ts-ignore:unused
    install(app: App) {

    }
}

export { showModal };