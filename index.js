
import React from './react'
import ReactDOM from './react-dom';

class Home2 extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            num:0
        }
    
    }
    componentWillMount() {
        console.log('组件将要挂载');
    }
    componentWillReceiveProps(props) {
        console.log('组件接受参数');
    }
    componentWillUpdate() {
        console.log('组件将要更新');
    }
    componentDidUpdate() {
        console.log('组件已经更新');
    }
    componentDidMount() {
        console.log('组件已经挂载');
    }
    handleClick() {
        this.setState({
          num:this.state.num+1
      })
    }
    render() {
        return <div>
            {this.state.num}
            <button onClick={this.handleClick.bind(this)}>加一</button>
        </div>
    }
}
const ele = (
    <div className="hi" title="ele">
      hello <span>hi</span>
    </div>
)
function Home(props) {
    return <div>Home</div>
}

ReactDOM.render(<Home2 name="hi"/>,document.getElementById('root'))