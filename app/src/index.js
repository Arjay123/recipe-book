import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Navbar extends React.Component {
    render() {
        return (
            <div id="navbar">
              <div className="navbar-hdr">
                <div className="site-hdr">RECIPE BOOK</div>
              </div>
              <div className="navbar-links">
                <div className="navbar-link"><a href="#">HOME</a></div>
                <div className="navbar-link"><a href="#">RECIPES</a></div>
                <div className="navbar-link"><a href="#">LINK1</a></div>
                <div className="navbar-link"><a href="#">LINK2</a></div>
              </div>
              <div className="navbar-foot">
                  <span>Stay Connected</span>
                  <div>
                    <a href="#"><i className="fa fa-github" aria-hidden="true"></i></a>
                    <a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
                    <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                  </div>
              </div>
            </div>
        );
    }
}

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: props.recipe.ingredients,
            directions: props.recipe.directions
        };

        this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
        this.handleDirectionAdd = this.handleDirectionAdd.bind(this);
        this.swapDirections = this.swapDirections.bind(this);
        this.swapIngredients = this.swapIngredients.bind(this);
        this.swapElements = this.swapElements.bind(this);
    }

    handleIngredientAdd(value) {
        this.setState({
            ingredients: this.state.ingredients.concat(value)
        });
    }

    handleDirectionAdd(value) {
        this.setState({
            directions: this.state.directions.concat(value)
        });
    }

    swapDirections(from_i, to_i) {
        this.setState({
            directions: this.swapElements(this.state.directions.slice(), from_i, to_i)
        });
    }

    swapIngredients(from_i, to_i) {
        this.setState({
            ingredients: this.swapElements(this.state.ingredients.slice(), from_i, to_i)
        });
    }

    swapElements(arr, i, j) {
        var hold = arr[j];
        arr[j] = arr[i];
        arr[i] = hold;

        return arr;
    }

    render() {
        var classes = "recipe";
        return (
            <div className={classes}>
                <div className="recipe-hdr">
                    <h1>Chicken Nuggets</h1>
                </div>
                <div className="recipe-body">
                        <Ingredients
                            ingredients={this.state.ingredients}
                            onIngredientAdd={this.handleIngredientAdd}
                            swapIngredients={this.swapIngredients}
                        />
                        <Directions
                            directions={this.state.directions}
                            onDirectionAdd={this.handleDirectionAdd}
                            swapDirections={this.swapDirections}
                        />
                </div>
            </div>
        );
    }
}

class Ingredients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newIngredient: "",
            newQuantity: ""
        };

        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.dragOver = this.dragOver.bind(this);
    }

    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", this.dragged);
    }

    dragEnd(e) {

        const fromID = this.dragged.dataset.id;
        const toID = this.over.dataset.id;


        if(fromID === toID){
            console.log("same index, no swap");
            return;
        }

        if(fromID === undefined || fromID >= this.props.ingredients.length){
            console.log("from element swap not valid");
            return;
        }

        if(toID === undefined || toID >= this.props.ingredients.length){
            console.log("to element swap not valid");
            return;
        }

        this.props.swapIngredients(this.dragged.dataset.id, this.over.dataset.id);
    }

    dragOver(e) {
        e.preventDefault();
        this.over = e.target;
    }

    handleIngredientChange(event) {
        this.setState({
            newIngredient: event.target.value
        });
    }

    handleQuantityChange(event) {
        this.setState({
            newQuantity: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.onIngredientAdd(this.state.newQuantity + " " + this.state.newIngredient);
        this.setState({
            newIngredient: "",
            newQuantity: ""
        });
        event.preventDefault();
    }


    render() {
        const classes = "ingredients";
        const ing_render = this.props.ingredients.map((ingredient, index) =>
            <Row
                text={ingredient}
                class="ingredient"
                dataID={index}
                key={index}
                onDragStart={this.dragStart}
                onDragEnd={this.dragEnd}
                onDragOver={this.dragOver}
            />
        );

        return (
            <div className={classes}>
                <h2 className="hdr">Ingredients</h2>
                <ul onDragOver={this.dragOver}>
                    {ing_render}
                </ul>
                <div className="ingredient-form">
                    <h3>Add Ingredient</h3>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Ingredient: </td>
                                    <td>
                                        <input type="text" value={this.state.newIngredient} onChange={this.handleIngredientChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Quantity: </td>
                                    <td>
                                        <input type="text" value={this.state.newQuantity} onChange={this.handleQuantityChange}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input className="submit-ingredient" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}



class Directions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newStep: ""
        };

        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.dragOver = this.dragOver.bind(this);
    }

    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", this.dragged);
    }

    dragEnd(e) {

        const fromID = this.dragged.dataset.id;
        const toID = this.over.dataset.id;

        if(fromID === toID){
            console.log("same index, no swap");
            return;
        }

        if(fromID === undefined || fromID >= this.props.directions.length){
            console.log("from element swap not valid");
            return;
        }

        if(toID === undefined || toID >= this.props.directions.length){
            console.log("to element swap not valid");
            return;
        }

        this.props.swapDirections(this.dragged.dataset.id, this.over.dataset.id);
    }

    dragOver(e) {
        e.preventDefault();
        this.over = e.target;
    }

    handleStepChange(event) {
        this.setState({
            newStep: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.onDirectionAdd(this.state.newStep);
        this.setState({
            newStep: ""
        });
        event.preventDefault();
    }

    render() {
        const classes = "directions";
        const dir_render = this.props.directions.map((direction, index) =>
            <Row
                text={direction}
                class="direction"
                dataID={index}
                key={index}
                onDragStart={this.dragStart}
                onDragEnd={this.dragEnd}
                onDragOver={this.dragOver}
            />
        );

        return (
            <div className={classes}>
                <h2 className="hdr" >Directions</h2>
                <ol onDragOver={this.dragOver}>
                    {dir_render}
                </ol>
                <div className="direction-form">
                    <h3>Add Direction</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <textarea className="textarea" rows={5} value={this.state.newStep} onChange={this.handleStepChange} />
                        </div>
                        <input className="submit-direction" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}


class Row extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hover: false
        };

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseEnter(e){
        this.setState({
            hover: true
        });
    }

    mouseLeave(e){
        this.setState({
            hover: false
        });
    }

    render() {

        let item = <li
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
                draggable="true"
                data-id={this.props.dataID}
                className={this.props.class}
                onDragStart={this.props.onDragStart}
                onDragEnd={this.props.onDragEnd}
            >
                {this.props.text}
            </li>;
        if(this.state.hover){
            return (
                <div>
                {item}
                <span>Hovering</span>
                </div>
            );
        }
        return item;

    }
}


var recipe = {
    "ingredients": [
            "1 cup bread crumbs",
            "1/2 teaspoon garlic powder",
            "1/2 teaspoon dried thyme",
            "1/4 cup Dijon mustard",
            "1/3 cup light mayonnaise",
            "1 1/2 pounds chicken tenders, cut into 1-inch pieces",
            "3/4 pound green beans, washed, trimmed and steamed"
    ],
    "directions": ["Heat oven to broil. Coat baking rack with nonstick cooking spray. Place rack over baking sheet; set aside.",
            "Stir together bread crumbs, garlic powder and thyme in a pie plate; set aside. Stir together mustard and mayonnaise.",
            "Reserve about 1/2 cup of mustard mixture for dipping sauce. Brush chicken pieces with remaining mustard mix; place chicken in pie plate with bread crumb mixture, spooning crumbs on top of pieces and pressing to adhere. Transfer to prepared baking rack. Broil for 10 minutes or until cooked through. Serve with reserved dipping sauce and green beans on the side."
        ]
};

function App() {
    return (
        <div className="wrap">
            <Navbar />
            <Recipe recipe={recipe} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
