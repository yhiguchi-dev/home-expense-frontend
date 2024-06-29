class Box extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = `
    <style>
      div {
        padding: ${this.p};
      }
    </style>
    <div/>`;
  }
}
customElements.define('box', Box);