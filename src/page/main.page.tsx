/**
 * @author Tim
 * @overview generated by ghoti-cli
 * @fileoverview Page set PageGhotiMain
 */

import * as React from 'react';
import * as Component from '../component/import';
import * as Func from '../func/import';
import * as Lambda from '../lambda/import';
import logo from '../func/logo'
import { ListGroupItem, Collapse } from "reactstrap"

import Config from '../config/config';
import * as $ from "jquery"

export interface IProps {
    history: any
}

export interface IState {

}

class PageGhotiMain extends React.Component<IProps, IState> {
    height: number = 0
    reload: number = 0
    state = {
        data: [],
        alluser: [],
        clients: [],
        allTasks: [],
        nonArcTasks: [],
        currPageSize: "25",
        currPage: 0,
        searchAddr: "",
        currtaskLeng: 0,
        userCollapse: false,

        Loading: 0
    }

    public constructor(props) {
        super(props);
        this.searchProperty = this.searchProperty.bind(this);
        this.showTable = this.showTable.bind(this);
        this.topBarComponent = this.topBarComponent.bind(this);
        this.pageSizeComponent = this.pageSizeComponent.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.editTask = this.editTask.bind(this);
        this.setTask = this.setTask.bind(this);
        this.showStage = this.showStage.bind(this);
        this.showStatus = this.showStatus.bind(this);
        this.pushPage = this.pushPage.bind(this);

    }
    public componentDidMount() {
        $.ajax({
            url: 'https://rpnserver.appspot.com/findAllUsers',
            headers: {
                Authorization: "Bearer " + localStorage.getItem('Token'),
            },
            method: 'GET',
            datatype: "json",
            data: JSON.stringify({
            }),
            success: (function (result) {
                //console.log(result);
                this.setState({ alluser: result });
                this.reload += 1;
                this.setState({ Loading: this.reload })
            }).bind(this),
        });
        $.ajax({
            url: 'https://rpnserver.appspot.com/findAllClient',

            headers: {
                Authorization: "Bearer " + localStorage.getItem('Token'),
            },
            method: 'GET',
            datatype: "json",
            data: JSON.stringify({
            }),
            success: (function (result) {
                // console.log(result);
                this.setState({ clients: result });
                this.reload += 1;
                this.setState({ Loading: this.reload })
            }).bind(this),
        });
        if (localStorage.getItem('Authority') === '5' || '4') {
            $.ajax({
                url: 'https://rpnserver.appspot.com//findAllTasksByStage?stage=running&paging=true&page_index=0&page_size=25',

                headers: {
                    Authorization: "Bearer " + localStorage.getItem('Token'),
                },
                method: 'GET',
                datatype: "json",
                data: JSON.stringify({
                }),
                success: (function (result) {
                    console.log(result);
                    this.setState({ data: result });
                    this.reload += 1;
                    this.setState({ Loading: this.reload })
                }).bind(this),
            });
            $.ajax({
                url: 'https://rpnserver.appspot.com//findAllTasksByStage?stage=running',

                headers: {
                    Authorization: "Bearer " + localStorage.getItem('Token'),
                },
                method: 'GET',
                datatype: "json",
                data: JSON.stringify({
                }),
                success: (function (result) {
                    console.log(result);
                    this.setState({ allTask: result });
                    this.setState({ currtaskLeng: result.length })
                    this.reload += 1;
                    this.setState({ Loading: this.reload })
                }).bind(this),
            });

            

        }
        else if (localStorage.getItem('Authority') === '3') {
            $.ajax({
                url: 'https://rpntechserver.appspot.com/userProfile',

                headers: {
                    Authorization: "Bearer " + localStorage.getItem('Token'),
                },
                method: 'GET',
                datatype: "json",
                data: JSON.stringify({
                }),
                success: (function (result) {
                    //console.log(result);
                    this.setState({ data: result });
                    this.setState({ currtaskLeng: result.length })
                    this.reload += 1;
                    this.setState({ Loading: this.reload })
                }).bind(this),
            });
        }
    }

    public render() {
        this.height = window.innerHeight
        this.height = this.height * 0.65
        if (localStorage.getItem("Authority") === '5' || '4' || '0') {
            if (this.reload == 4) {
                return (<React.Fragment>
                    <div className="page">
                        <Component.leftBar page="main" pushPage={this.pushPage.bind(this)} />
                        {this.topBarComponent()}
                        <div className="content">
                            <div style={{
                                color: "#283747",
                                fontWeight: "bold",
                                fontSize: "22px",
                                marginLeft: "15px",
                                marginTop: "5px"
                            }}>Dashboard</div>
                            <div className="mainTable">
                                {this.showTable()}

                            </div>
                        </div>
                    </div>
                </React.Fragment>);
            }
            else {
                return(
                    <React.Fragment>
                    <div className="page">
                        <Component.leftBar page="main" pushPage={this.pushPage.bind(this)} />
                        {this.topBarComponent()}
                        <div style={{ float: "right", width: "85%", height: "80%" }}>
                            <div style={{ marginLeft: "49%", marginTop: "30%" }}>
                                <img style={{ marginLeft: "3%" }} src="https://www.googleapis.com/download/storage/v1/b/post-images-rpntech/o/e7f0a5e2-6279-44df-8507-0a6a09dddc2f?generation=1553525595322811&alt=media" />
                                <div>Loading...</div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                )
                
            }
        }
        else{
            return(
                <div>123</div>
            )
        }

    }
    protected showStage(stage) {
        if (stage === "0") {
            return "Initial"
        }
        else if (stage === "1") {
            return "Bid"
        }
        else if (stage === "2") {
            return "Work Order"
        }
        else if (stage === "3") {
            return "Invoice"
        }
        else if (stage === "4") {
            return "Pending Accounting Review"
        }
        else if (stage === "5") {
            return "Complete"
        }
        else if (stage === '6') {
            return "Archived"
        }
        else {
            return "Terminated"
        }
    }
    protected showStatus(item) {
        if (item.TaskStatus === '0') {
            return (
                <button
                    style={{
                        marginTop: "5px",
                        fontSize: "13px"
                    }}
                    className="btn btn-outline-danger btn-sm disabled"
                    // onClick={this.changeStatus.bind(this, item)}
                    disabled>Incomplete</button>
            )
        }
        else if (item.TaskStatus === '1') {
            return (<button
                style={{
                    marginTop: "5px",
                    fontSize: "13px"
                }}
                className="btn btn-outline-success btn-sm disabled"
                // onClick={this.changeStatus.bind(this, item)}
                disabled>Complete</button>)
        }
        else {
            return (
                <button

                >?</button>
            )
        }
    }
    protected editTask(item) {
        localStorage.setItem("currTask", item.TaskID);
        localStorage.setItem("currStage", item.Stage);
        //console.log(item.TaskID);
        this.props.history.push('/edittask');
    }

    protected setTask(item) {

    }

    protected showTable() {
        if (localStorage.getItem("Authority") === '3') {
            return (<React.Fragment>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">

                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>)
        }
        else if (localStorage.getItem("Authority") === '4'||'5') {
            return (<React.Fragment>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">

                    </div>
                    <div style={{}} className="card-body">
                        {this.pageSizeComponent()}
                        <div style={{
                            overflowY: "auto",
                            height: this.height,
                            boxSizing: "border-box"

                        }} className="table-responsive">

                            <table className="tasktable" style={{
                                fontSize: "13px"
                            }}><thead style={{
                                // display:"block"
                            }}>

                                    <tr><th>Action</th>
                                        <th>Property Address</th>
                                        <th>Asset Number</th>
                                        <th>Due Date</th>
                                        <th>User</th>
                                        <th>CurrStage</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody style={{
                                    // display:"block",
                                    // overflow:"auto",
                                    // height:"450px",
                                    // width:"100%"
                                }}>

                                    {this.state.data.map(function (item, key) {
                                        let temp = '#a' + key;
                                        let temp2 = 'a' + key;
                                        return (
                                            <tr style={{ height: "5px" }} key={key}>
                                                <td style={{ height: "5px" }}>
                                                    <button style={{
                                                        marginRight: '5px',
                                                        fontSize: "13px"
                                                        // marginTop: '5px'
                                                    }} title="edit" className="btn btn-primary btn-sm" onClick={this.editTask.bind(this, item)}><ins>Edit</ins></button>
                                                    {localStorage.getItem("Authority") === '2' ? <button style={{
                                                        marginRight: '5px',
                                                        fontSize: "13px"
                                                        // marginTop: '5px'
                                                    }} title="setTask" className="btn btn-info btn-sm" onClick={this.setTask.bind(this, item)}><ins>SetTask</ins></button> : void 0}
                                                    {/* <button title="deltask" onClick={this.delTask.bind(this, item)}>Del</button> */}
                                                </td>
                                                <td>
                                                    {/* {this.showLogo.bind(this, item)} */}
                                                    {item.Address}</td>
                                                <td>{item.asset_num}</td>
                                                <td>{item.DueDate?item.DueDate[parseInt(item.Stage)]:void 0}</td>
                                                <td>
                                                    <Component.ListGroupCollapse key={key} Username={item.Username} />
                                                </td>
                                                {/* <td><a data-toggle="collapse" href={temp}>Show User</a><div id={temp2} className="panel-collapse collapse">{this.showUsername(item.Username)}</div></td> */}
                                                {/* <td><button className="link collapsible">{this.clickShowUser}Show User</button><div id="content" style={{display: "none"}}>{this.showUsername(item.Username)}</div></td> */}
                                                <td>{this.showStage(item.Stage)}</td>
                                                <td>{this.showStatus(item)}</td>

                                            </tr>
                                        )
                                    }.bind(this))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </React.Fragment>)
        }
        else if (localStorage.getItem("Authority") === '1') {
            return (<React.Fragment>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">

                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>)
        }
        else {
            return (<div>No Permission</div>)
        }
    }



    protected pageSizeComponent() {
        return (
            <div style={{ marginLeft: "5px", fontSize: "13px", marginTop: "5px", marginBottom: "10px" }}>
                Show
                        <select style={{ marginLeft: "3px", marginRight: "3px" }} onChange={e => this.changePageSize(e.target.value)}>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                    <option>all</option>
                </select>
                Entries


            </div>
        )
    }

    protected topBarComponent() {
        return (
            <div className="topBar">
                <div className="searchBox">
                    <div className="input-group"
                        style={{
                            width: "50%",
                            paddingTop: "20px",
                            marginLeft: "40px",
                            // border:"1px solid black"
                        }}>
                        <input type="text" className="form-control bg-light border-0 small"
                            onChange={event => { this.setState({ searchAddr: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.searchProperty()
                                }
                            }}
                            placeholder="Search for Addr..." ></input>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={this.searchProperty}>
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="profileBox">
                    <div style={{
                        paddingTop: "5%"
                    }}>
                        <button className="link" style={{
                            width: "180px",
                            float: "right",
                            backgroundColor: "Transparent",
                            border: "none",
                            outline: "none"
                        }}
                            onClick={function () { this.props.history.push("/userProfile") }.bind(this)}>
                            <span style={{
                                color: "#616161"
                            }} className="mr-2 d-none d-lg-inline text-gray-600">Tim Yuan</span>
                            <img style={{
                                width: "20%"
                            }} className="img-profile rounded-circle" src={logo} />
                        </button>
                    </div>

                </div>
            </div>
        )
    }

    protected searchProperty() {
        if (this.state.searchAddr === "") {
            window.alert("Please Enter Address!!!")
        }
        else {
            $.ajax({
                url: 'https://rpntechserver.appspot.com//findTaskByAddr?address=' + this.state.searchAddr,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('Token'),
                },
                method: 'GET',
                datatype: "json",
                data: JSON.stringify({
                }),
                success: (function (result) {
                    if (result) {
                        console.log(result)
                        this.setState({ data: result });
                    }
                    else {
                        window.alert("No such Property!!!!")
                    }

                }).bind(this),
            });
        }

    }

    protected pushPage(page: String) {
        this.props.history.push(page)
    }

    protected changePageSize(size: String) {

    }
}

export default PageGhotiMain;