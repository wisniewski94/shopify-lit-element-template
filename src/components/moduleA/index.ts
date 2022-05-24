import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
    static styles = [
        css`
            :host {
                display: blocks;
            }
        `
    ];

    @property() name = "World";

    render() {
        return html`<h1>Hello World</h1>`;
    }
}