import { ref, watch } from "vue";

interface Options {
  /* something */
}

class SuperRadioReceiver {
  private selectedItems = ref<Array<string>>([]);

  constructor(
    public items: Array<string>,
    public options: Options = {}
  ) {
    this.receiver = this.receiver.bind(this);
  }

  public get selected() {
    return this.selectedItems.value;
  }

  public receiver(value: Array<string>) {
    this.selectedItems.value = value;
  }

  public watchItems() {
    watch(this.selectedItems, newItem => {
      console.log(newItem);
    });
  }
}

export default SuperRadioReceiver;