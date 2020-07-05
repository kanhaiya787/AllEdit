import React, {Component, Link} from 'react';

 class Home extends React.Component{

    constructor(props){
        super(props);
    }

    submit(){
      
    }

    render(){
        return(
            <form>
                <h5>Join</h5>
                <input type="text" /><h5> project as </h5>
                <input type="text"/>
                <input onClick= {this.submit} type="submit" value="Connect"/>
            </form>
        )
    }

}

export default Home;
