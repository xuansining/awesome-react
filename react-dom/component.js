import { renderComponent } from "./index"

class Component{
    constructor(props={}) {
        this.state = {}
        this.props=props
    }
    setState(newState) {
        console.log(newState);
        Object.assign(this.state, newState)
        renderComponent(this)
    }
}
export default Component