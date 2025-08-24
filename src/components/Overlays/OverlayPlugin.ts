import {App, ref} from "vue";

export const overlays = ref<ModalData[]>([]);

export class ModalData {
    constructor(component: any, props?: any, onClose?: (cancelPressed: boolean) => void) {
        this.component = component;
        this.props = props;
        this.onClose = onClose ? (onClose) : (() => {});
    }

    public component: any;
    public props: any;
    //@ts-ignore
    public onClose: (cancelPressed: boolean) => void;

    public close(cancelPressed: boolean = false) {
        overlays.value = overlays.value.filter((m) => m !== this);

        if (this.onClose !== undefined) this.onClose(cancelPressed)
    }
}

function showModal(modal: any, props?: object, onClose?: (cancelPressed: boolean) => void) {
    console.log("Show modal")
    overlays.value.push(new ModalData(modal, props, onClose));
}

export default {
    //@ts-ignore:unused
    install(app: App) {

    }
}

export {showModal};