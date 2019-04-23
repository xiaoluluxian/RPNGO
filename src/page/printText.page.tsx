/**
 * @author Tim
 * @overview generated by ghoti-cli
 * @fileoverview Page set PageGhotiPrintText
 */

import * as React from 'react';
import * as Component from '../component/import';
import * as Func from '../func/import';
import * as Lambda from '../lambda/import';
import logo from '../func/logo';
import * as $ from "jquery"
import Config from '../config/config';

export interface IProps {
    history:any
}

export interface IState {

}

class PageGhotiPrintText extends React.Component<IProps, IState> {
    state = {
        //page:null,
        Address: '',
        Area: '',
        BillTo: '',
        City: '',
        CompletionDate: '',
        Desc: '',
        DescCN: '',
        Invoice: '',
        DueDate: '',
        InvoiceDate: '',
        Item: [],
        LBNum: '',
        Note: '',
        Stage: '',
        StartDate: '',
        Stories: '',
        TotalCost: '',
        TotalImage: 0,
        Year: '',
        AssetNum: '',
        uploadLink: '',
        Tax: '',
        Before: [],
        During: [],
        After: [],
        Username: [],
        alluser: [],
        TaskStatus: '',
        Client: '',
        // test: 'test',
        // x: "a",
        CheckList: [],
        Comment: "",
        Markers: [],
        currImgID: ""
    }
    public componentDidMount() {
        // console.log(localStorage.getItem("currStage"));
        $.ajax({
            url: 'https://rpntechserver.appspot.com/findTaskById?task_id=' + localStorage.getItem("currTask"),
            //url: 'http://localhost:8080/login',
            headers: {
                Authorization: "Bearer " + localStorage.getItem('Token'),
            },
            method: 'GET',
            datatype: "json",
            data: JSON.stringify({
            }),
            success: (function (result) {
                //let test: IPage=JSON.parse(result.toString);
                // console.log(test);
                console.log(result);
                // console.log(JSON.stringify(result));
                this.setState({ Address: result.Address });
                this.setState({ Area: result.Area });
                this.setState({ BillTo: result.BillTo });
                this.setState({ City: result.City });
                this.setState({ CompletionDate: result.CompletionDate });
                this.setState({ Desc: result.Desc });
                this.setState({ DescCN: result.DescCN });
                this.setState({ Invoice: result.Invoice });
                this.setState({ DueDate: result.DueDate });
                this.setState({ InvoiceDate: result.InvoiceDate });
                this.setState({ Item: result.ItemList });
                this.setState({ LBNum: result.KeyCode });
                this.setState({ Note: result.Note });
                this.setState({ Stage: result.Stage });
                this.setState({ StartDate: result.StartDate });
                this.setState({ Stories: result.Stories });
                this.setState({ TotalCost: result.TotalCost });
                this.setState({ TotalImage: result.TotalImage });
                this.setState({ Year: result.Year });
                this.setState({ AssetNum: result.asset_num });
                this.setState({ uploadLink: result.upload_link });
                this.setState({ Tax: result.Tax });
                this.setState({ Username: result.Username });
                this.setState({ Client: result.Client });
                this.setState({ TaskStatus: result.TaskStatus });
                this.setState({ CheckList: result.CheckList });
                this.setState({ Comment: result.Comment });

                //this.setState({ })                


            }).bind(this),
        });
        
    }
    public constructor(props) {
        super(props);
    }

    public render() {
        let taxTotal = 0;
        let TotalAmount = 0;
        for (let i of this.state.Item) {
            TotalAmount += (i.Amount ? i.Amount : 0);
            taxTotal += (i.Tax ? i.Tax : 0);
        }
        return (<div>
            <div id="noprint" style={{
                height: "3%",
                backgroundColor: "lightblue"
            }}>
                <button id="backbtn" style={{marginLeft:"3px"}} onClick={() => {
                    this.props.history.push("/edittask")
                }}>back</button>
                <button id="printbtn" style={{marginLeft:"10px"}} onClick={() => {
                    let hideDiv = document.getElementById("noprint");
                    hideDiv.style.visibility = 'hidden';
                    window.print();
                    hideDiv.style.visibility = "visible";
                }}>Print</button>
            </div>

            {this.showTable(taxTotal, TotalAmount)}
        </div>);
    }
    protected mapPicture(picture: any[], desc: string, descCN: string){
        return (
            picture.map(function (item, key) {
                return (
                    
                    <div key={key} style={{
                        // position: 'flex',
                        flex:1,
                        // float:"left"
                        width:"33%",
                        display:"inline-block"
                    }}>
                        <div>
                            <img style={{
                                width: '90%',
                                height: 'auto',
                                padding: '3px'
                            }}
                                src={item.Src}
                           
                            />
                            <div style={{width:"97%"}}>{desc}{descCN ? "/" + descCN : ""}</div>
                        </div>
                        
                    </div>
                    
                    
                    
                )
            }.bind(this))
        )
    }

    

    protected showTable(taxTotal, TotalAmount) {
        if (this.state.Stage === "0") {
            return (
                <React.Fragment>
                    <table id="stage0">
                        <tr ><td style={{ width: "25%" }}>Property Address:</td> <td>{this.state.Address}</td></tr>
                        <tr><td style={{ width: "25%" }}>Asset Number</td> <td>{this.state.AssetNum}</td></tr>
                        <tr><td style={{ width: "25%" }}>Start Date</td><td>{this.state.StartDate}</td></tr>
                        <tr><td style={{ width: "25%" }}>Due Date</td><td>{this.state.DueDate}</td></tr>
                        <tr><td style={{ width: "25%" }}>City/State/Zip Code </td><td>{this.state.City}</td></tr>
                        <tr><td style={{ width: "25%" }}>Description </td><td>{this.state.Desc}</td></tr>
                        <tr><td style={{ width: "25%" }}>Lock Box Number</td> <td>{this.state.LBNum}</td></tr>
                    </table>
                </React.Fragment>
            )
        }
        else if (this.state.Stage === "1"||this.state.Stage === "2") {
            return (
                <React.Fragment>
                    <div style={{
                        float: "left",
                        marginLeft: "20px",
                        // marginTop:"160px",
                        width: "45%",
                        height: "10px",
                        // backgroundColor:"blue"
                    }}>
                        <div style={{
                            flex: 1,
                            paddingLeft: '10px',
                            paddingTop: '20px',
                            display: 'inline',
                            fontSize: '20px',
                            color: 'darkblue',
                            fontWeight: 'bold',
                        }}>
                            
                        </div>
                        <div style={{ 
                display: 'flex',
                marginTop:"75px"
                
                }}>
                
                <img src={logo} alt="logo" style={{
                    width: '70px',
                    height: '60px',
                }} />
                
                <div style={{ flex: 3,
                    paddingLeft:'10px' ,
                
                }}>
                <div style={{
                    flex: 1,
                    paddingTop:'20px',
                    display: 'inline',
                    fontSize: '20px',
                    color: 'darkblue',
                    fontWeight: 'bold',
                }}>
                    Document Presented by<br/>
                    Repair and Preservation Network, LLC<br/>
                </div>
                    10 Old Mamaroneck Road Unit 1A.<br />
                    White Plains, NY 10605<br />
                    Phone: (866)-766-8880
                    
                </div>
                </div>
                    </div >
                    <div style={{ marginTop:"10px", width: "55%", float: "right" }}>
                        <h1 style={{
                            color:"powderblue", 
                            marginLeft: "10px", 
                            textAlign:"center", 
                            fontSize: '45px',
                            fontWeight: 'bold', 
                    }}>BID</h1>
                        <table id="stage1" style={{
                            // float: "right",
                            // width: "45%",
                            // marginRight: "10px",
                            marginTop: "20px"
                        }}>
                            <tr><td style={{ width: "25%" }}>Property Address:</td> <td>{this.state.Address}</td></tr>
                            <tr><td style={{ width: "25%" }}>State/County/City/Zip Code</td><td>{this.state.City}</td></tr>
                            <tr><td style={{ width: "25%" }}>Asset Number:</td> <td>{this.state.AssetNum}</td></tr>
                            <tr><td style={{ width: "25%" }}> Description:</td><td>{this.state.Desc}</td></tr>
                            <tr><td style={{ width: "25%" }}>Lock Box Number:</td> <td>{this.state.LBNum}</td></tr>
                        </table>
                    </div>
                    <div style={{
                        marginTop:"400px", 
                        marginLeft:"30px"
                    }}>
                    <table style={{margin:"auto"}}>
                        <thead>
                            <tr>
                                <th style={{width:"8%"}}>Category</th>
                                <th style={{width:"5%"}}>Item</th>
                                <th>Description</th>
                                <th style={{width:"8%"}}>Tax</th>
                                <th style={{width:"15%"}}>Amount</th>
                                
                            </tr>
                        </thead>
                        <tbody>{this.state.Item.map(function (item, key) {
                            return (
                                <React.Fragment key={key}>
                                    <tr>
                                        <td>{item.Cate}</td>
                                        <td>{item.Item}</td>
                                        <td>{item.description}<div>{item.Comments}</div></td>
                                        <td>{item.Tax}</td>
                                        <td>{item.Amount}</td>
                                        
                                    </tr>
                          
                                </React.Fragment>
                            )
                        }.bind(this))}
                            <tr><td colSpan={4}>Sales tax {this.state.Tax} %</td><td colSpan={5}>TaxAmount: ${taxTotal}</td></tr>
                            <tr><td colSpan={6}>Total Amount: ${TotalAmount} </td></tr>
                        </tbody>
                        {/* <tbody>
                            {this.state.Item.map(this.mapShowItem)}
                        </tbody> */}
                    </table>
                    </div>
                    

                </React.Fragment>
            )
        }
        else if (this.state.Stage === "3"||this.state.Stage === "4") {
            return (
                
                <React.Fragment>
                <div style={{
                    float: "left",
                    marginLeft: "20px",
                    width: "45%",
                    height: "10px",
                    // backgroundColor:"blue"
                }}>
                    <div style={{
                        flex: 1,
                        paddingLeft: '10px',
                        paddingTop: '20px',
                        display: 'inline',
                        fontSize: '20px',
                        color: 'darkblue',
                        fontWeight: 'bold',
                    }}>
                        <div style={{
                            width: 'auto',
                            height: '40px',
                        }}>
                            {/* <img src={rlogo} alt="logo" style={{
                                width: 'auto',
                                height: '80px',
                            }} /> */}
                        </div>
                    </div>
                    <div style={{ 
            display: 'flex',
            
            }}>
            
            <img src={logo} alt="logo" style={{
                width: '70px',
                height: '60px',
            }} />
            
            <div style={{ flex: 3,
                paddingLeft:'10px' ,
            
            }}>
            <div style={{
                flex: 1,
                paddingTop:'20px',
                display: 'inline',
                fontSize: '20px',
                color: 'darkblue',
                fontWeight: 'bold',
            }}>
                Document Presented by<br/>
                Repair and Preservation Network, LLC<br/>
            </div>
                10 Old Mamaroneck Road Unit 1A.<br />
                White Plains, NY 10605<br />
                Phone: (866)-766-8880
                
            </div>
            </div>
                </div >


                <div style={{ marginTop:"10px", width: "55%", float: "right" }}>
                    <h1 style={{
                        color:"powderblue", 
                        marginLeft: "10px", 
                        textAlign:"center", 
                        fontSize: '45px',
                        fontWeight: 'bold', 
                }}>WORK ORDER</h1>
                <table id="stage2" style={{
                        // float: "right",
                        // width: "45%",
                        // marginRight: "10px",
                        marginTop: "20px"
                    }}>
                        <tr><td style={{ width: "25%" }}>Property Address</td> <td>{this.state.Address}</td></tr>
                        <tr><td style={{ width: "25%" }}>State/County/City/Zip Code</td><td>{this.state.City}</td></tr>
                        <tr><td style={{ width: "25%" }}>KeyCode/LockBoxNum</td><td>{this.state.LBNum}</td></tr>
                        <tr><td style={{ width: "25%" }}>Start Date</td><td>{this.state.StartDate[parseInt(this.state.Stage)]}</td></tr>
                        <tr><td style={{ width: "25%" }}>Due Date</td><td>{this.state.DueDate[parseInt(this.state.Stage)]}</td></tr>
                    </table>
                    
                </div>
                <div style={{
                    marginTop:"350px", 
                    marginLeft:"30px"
                }}>
                <table style={{margin:"auto"}}>
                    <thead>
                        <tr>
                        <th style={{width:"8%"}}>Category</th>
                                <th style={{width:"5%"}}>Item</th>
                                <th>Description</th>
                                <th style={{width:"8%"}}>Tax</th>
                                <th style={{width:"15%"}}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.Item.map(function (item, key) {
                        return (
                            <React.Fragment key={key}>
                                <tr>
                                    <td>{item.Cate}</td>
                                    <td>{item.Item}</td>
                                    <td>{item.description}<div>{item.Comments}</div></td>
                                    <td>{item.Tax}</td>
                                    <td>{item.Amount}</td>
                                    
                                </tr>
                             
                            </React.Fragment>
                        )
                    }.bind(this))}
                        <tr><td colSpan={4}>Sales tax {this.state.Tax} %</td><td colSpan={5}>TaxAmount: ${taxTotal}</td></tr>
                        <tr><td colSpan={6}>Total Amount: ${TotalAmount} </td></tr>
                    </tbody>
                    {/* <tbody>
                        {this.state.Item.map(this.mapShowItem)}
                    </tbody> */}
                </table>
                </div>
                

            </React.Fragment>
            )
        }
        else {
            return (
                
                <React.Fragment>
                <div style={{
                    float: "left",
                    marginLeft: "20px",
                    width: "45%",
                    height: "10px",
                    // backgroundColor:"blue"
                }}>
                    <div style={{
                        flex: 1,
                        paddingLeft: '10px',
                        paddingTop: '20px',
                        display: 'inline',
                        fontSize: '20px',
                        color: 'darkblue',
                        fontWeight: 'bold',
                    }}>
                        <div style={{
                            width: 'auto',
                            height: '40px',
                        }}>
                            {/* <img src={rlogo} alt="logo" style={{
                                width: 'auto',
                                height: '80px',
                            }} /> */}
                        </div>
                    </div>
                    <div style={{ 
            display: 'flex',
            
            }}>
            
            <img src={logo} alt="logo" style={{
                width: '70px',
                height: '60px',
            }} />
            
            <div style={{ flex: 3,
                paddingLeft:'10px' ,
            
            }}>
            <div style={{
                flex: 1,
                paddingTop:'20px',
                display: 'inline',
                fontSize: '20px',
                color: 'darkblue',
                fontWeight: 'bold',
            }}>
                Document Presented by<br/>
                Repair and Preservation Network, LLC<br/>
            </div>
                10 Old Mamaroneck Road Unit 1A.<br />
                White Plains, NY 10605<br />
                Phone: (866)-766-8880
                
            </div>
            </div>
                </div >


                <div style={{ marginTop:"10px", width: "55%", float: "right" }}>
                    <h1 style={{
                        color:"powderblue", 
                        marginLeft: "10px", 
                        textAlign:"center", 
                        fontSize: '45px',
                        fontWeight: 'bold', 
                }}>INVOICE</h1>
                <table id="stage3" style={{
                        // float: "right",
                        // width: "45%",
                        // marginRight: "10px",
                        marginTop: "20px"
                    }}>
                        <tr><td style={{ width: "25%" }}>Property Address:</td> <td>{this.state.Address}</td></tr>
                        <tr><td style={{ width: "25%" }}>Invoice Number</td> <td>{this.state.Invoice}</td></tr>
                        <tr><td style={{ width: "25%" }}>CompletionDate</td><td>{this.state.CompletionDate}</td></tr>
                        <tr><td style={{ width: "25%" }}>Invoice Date</td><td>{this.state.InvoiceDate}</td></tr>
                        <tr><td style={{ width: "25%" }}>BillTo </td><td>{this.state.BillTo}</td></tr>
                    </table>
                </div>
                <div style={{
                    marginTop:"330px", 
                    marginLeft:"30px"
                }}>
                <table style={{margin:"auto"}}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Amount</th>
                            
                        </tr>
                    </thead>
                    <tbody>{this.state.Item.map(function (item, key) {
                        return (
                            <React.Fragment key={key}>
                                <tr>
                                    <td>{item.Cate}</td>
                                    <td>{item.Item}</td>
                                    <td>{item.description}<div>{item.Comments}</div></td>
                                    <td>{item.Amount}</td>
                                    
                                </tr>
                            
                            </React.Fragment>
                        )
                    }.bind(this))}
                        <tr><td colSpan={2}>HOA: Sales tax {this.state.Tax} %</td><td colSpan={5}>TotalTax: ${taxTotal}</td></tr>
                        <tr><td colSpan={6}>Total Amount: ${TotalAmount} </td></tr>
                    </tbody>
                    {/* <tbody>
                        {this.state.Item.map(this.mapShowItem)}
                    </tbody> */}
                </table>
                </div>
                

            </React.Fragment>
                
            )
        }
    }
}

export default PageGhotiPrintText;
