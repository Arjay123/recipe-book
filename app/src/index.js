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

    render() {
        var classes = "recipe";
        return (
            <div className={classes}>
                <div className="recipe-hdr">
                    <h1>Chicken Nuggets</h1>
                </div>
                <div className="recipe-body">
                        <Ingredients ingredients={this.state.ingredients} onIngredientAdd={this.handleIngredientAdd} />
                        <Directions directions={this.state.directions} onDirectionAdd={this.handleDirectionAdd} />
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
            <Row text={ingredient} class="ingredient" key={index} />
        );

        return (
            <div className={classes}>
                <h2 className="hdr">Ingredients</h2>
                <ul>
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
            <Row text={direction} class="direction" key={index}/>
        );

        return (
            <div className={classes}>
                <h2 className="hdr" >Directions</h2>
                <ol>
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
    render() {
        return (
            <li className={this.props.class}>{this.props.text}</li>
        );
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
