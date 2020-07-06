import React, {Component, Link} from 'react';

 class History extends React.Component{

    constructor(props){
        super(props);
    }

    createTable = (data) =>{
        let table=[];
        if(data!=null){
        for (let i = 0; i < data.length ; i++) {
            let children=[];
            children.push(<td>{data[i].time}</td>);
            children.push(<td>{data[i].data}</td>);
            table.push(<tr>{children}</tr>);
        }

        return table;
    }
    }
  

    render(){
        let data = this.props.data;
        //console.log(24,data);
        return(
            <div>
            <table border="1">
            <tr>
            <th>Time</th><th>Data</th>
            </tr>
            {this.createTable(data)}
            </table>
            </div>
        )
    }

}

export default History;
