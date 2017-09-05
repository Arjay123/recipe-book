import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

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

class Recipe extends React.Component {
    render() {
        var classes = "recipe";
        return (
            <div className={classes}>
                <div className="recipe-hdr">
                    <h1>Chicken Nuggets</h1>
                </div>
                <div className="recipe-body">
                        <Ingredients />
                        <Directions />
                </div>
            </div>
        );
    }
}

class Ingredients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: recipe.ingredients,
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
        this.setState({
            ingredients: this.state.ingredients.concat(this.state.newQuantity + " " + this.state.newIngredient)
        });
        event.preventDefault();
    }


    render() {
        const classes = "ingredients";
        const ing_render = this.state.ingredients.map((ingredient, index) =>
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
            directions: recipe.directions,
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
        this.setState({
            directions: this.state.directions.concat(this.state.newStep)
        })
        event.preventDefault();
    }

    render() {
        const classes = "directions";
        const dir_render = this.state.directions.map((direction, index) =>
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

ReactDOM.render(<Recipe />, document.getElementById('root'));
registerServiceWorker();
