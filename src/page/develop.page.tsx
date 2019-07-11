/**
 * @author Tim
 * @overview generated by ghoti-cli
 * @fileoverview Page set PageGhotiDevelop
 */

import * as React from 'react';
import * as Component from '../component/import';
import * as Func from '../func/import';
import * as Lambda from '../lambda/import';
import * as XLSX from "xlsx";
import * as Cheerio from "cheerio";
// import {} from 'googlemaps';
import * as $ from "jquery";
import Geosuggest from 'react-geosuggest'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel"
import { ColoradoJson } from "../config/ColoradoJson"
import Config from '../config/config';

import USA from "@svg-maps/usa";
import { SVGMap } from "react-svg-map";

export interface IProps {

}

export interface IState {

}
declare const google: any;
// console.log(ColoradoJson)
// console.log(USA)


class PageGhotiDevelop extends React.Component<IProps, IState> {
    // MyMapComponent = withGoogleMap(props => (
    //     <GoogleMap
    //         defaultZoom={5}
    //         defaultCenter={{ lat: 38.8780025, lng: -93.09770200000003 }}
    //         onClick={this.addMarker}
    //     >
    //         {this.state.Marker ? this.state.Marker.map(function (marker, index) {
    //             return (<Marker onDblClick={this.deleteMarker.bind(this, index)} key={index} position={{ lat: marker.lat, lng: marker.lng }} />)
    //         }.bind(this)) : void 0}
    //     </GoogleMap>
    // ))
    state = {
        Marker: [],
        tooltipStyle: {
            display: "none",
        },
        pointedLocation: "",
        currMap: USA,
        taskData: []
    }


    public constructor(props) {
        super(props);

        // console.log(this.state)
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.deleteMarker = this.deleteMarker.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this)
        this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this)
        this.handleLocationClick = this.handleLocationClick.bind(this)
        this.addTask = this.addTask.bind(this);
        this.inputFile = this.inputFile.bind(this);
    }

    public componentDidMount() {
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
                console.log(result);
               
            }).bind(this),
        });
    }

    public render() {
        return (<React.Fragment>
            {/* <input onChange={e => this.uploadFile(e.target.files)} type="file"></input> */}
            {/* <div>
                <this.MyMapComponent
                    containerElement={<div style={{ height: "700px" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                />
            </div>
            <div>
                <Geosuggest
                    onSuggestSelect={this.onSuggestSelect}
                    location={null}
                />
            </div> */}
            <input type="file" onChange={e => this.inputFile(e.target.files)}></input>
            {/* <button onClick={this.addTask}>add</button> */}
            <div style={{ width: "50%" }}>
                {/* <SVGMap
                    map={this.state.currMap}
                    onLocationMouseMove={this.handleLocationMouseMove}
                    onLocationMouseOver={this.handleLocationMouseOver}
                    onLocationClick={this.handleLocationClick}
                /> */}
                {/* <Component.SVGMap
                    
                    map={ColoradoJson}
                    onLocationClick={this.handleLocationClick}
                    onLocationMouseOver={this.handleLocationMouseOver}
                /> */}
            </div>
        </React.Fragment>);
    }

    protected addTask() {
        // for (let i = 0; i < this.state.taskData.length; i++) {
        //     let each = this.state.taskData[i];
        //     let orderNumber = each.OrderNumber;
        //     let loanNumber = each.LoanNumber;
        //     let address = each.Address1;
        //     let city = each.City;
        //     let state = each.State;
        //     let zip = each.Zip
        //     let citylist = state + "//" + city + "/" + zip
        // console.log(citylist)
        $.ajax({
            url: 'https://rpntechserver.appspot.com/initTask',
            method: 'POST',
            datatype: "json",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('Token'),
            },
            data: JSON.stringify({
                "asset_num": "",
                "StartDate": [
                    "",
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                "DueDate": [
                    "2019-07-19",
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                "CompletionDate": [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ],
                "City": "TX//GIDDINGS/78942",
                "Address": "986 N POLK ST",
                "Desc": "LoanNumber:" + "142248" + "OrderNumber:" + "6245" + "Photo Requirement - 10 PHOTO MINIUMUM Front View, Address and Street sign or GPS, All Violations, Damages, For Sale or Rent signs, Neighborhood. Please take additional photos of All 4 sides of the property and Utility Meters",
                "keycode": "",
                "client": "VRM",
                "Username": [
                    "Other Vender"
                ],
                "Vendor": "Other Vender",
                "ItemList": [
                    {
                        After: [],
                        Amount: 0,
                        Before: [],
                        During: [],
                        Process: '0',
                        Status: '0',
                        Tax: 0,
                        Taxable: true,
                        description: 'Front View',
                        Cate: 'VRM-Prefix',
                        Comments: '',
                        Item: 0,
                        Qty: 0,
                        UM: '',
                        PPU: 0,
                        Cost: 0,
                        SubCost: 0,
                        SubPPU: 0,
                        pano: "false",
                        description_cn: "",
                        measure: "",
                        completeness: "0"
                    },
                    {
                        After: [],
                        Amount: 0,
                        Before: [],
                        During: [],
                        Process: '0',
                        Status: '0',
                        Tax: 0,
                        Taxable: true,
                        description: 'Address and Street sign or GPS',
                        Cate: 'VRM-Prefix',
                        Comments: '',
                        Item: 1,
                        Qty: 0,
                        UM: '',
                        PPU: 0,
                        Cost: 0,
                        SubCost: 0,
                        SubPPU: 0,
                        pano: "false",
                        description_cn: "",
                        measure: "",
                        completeness: "0"
                    },
                    {
                        After: [],
                        Amount: 0,
                        Before: [],
                        During: [],
                        Process: '0',
                        Status: '0',
                        Tax: 0,
                        Taxable: true,
                        description: 'All 4 sides of the property and Utility Meters',
                        Cate: 'VRM-Prefix',
                        Comments: '',
                        Item: 2,
                        Qty: 0,
                        UM: '',
                        PPU: 0,
                        Cost: 0,
                        SubCost: 0,
                        SubPPU: 0,
                        pano: "false",
                        description_cn: "",
                        measure: "",
                        completeness: "0"
                    },
                    {
                        After: [],
                        Amount: 0,
                        Before: [],
                        During: [],
                        Process: '0',
                        Status: '0',
                        Tax: 0,
                        Taxable: true,
                        description: 'Neighborhood/Street Scene',
                        Cate: 'VRM-Prefix',
                        Comments: '',
                        Item: 3,
                        Qty: 0,
                        UM: '',
                        PPU: 0,
                        Cost: 0,
                        SubCost: 0,
                        SubPPU: 0,
                        pano: "false",
                        description_cn: "",
                        measure: "",
                        completeness: "0"
                    },
                    {
                        After: [],
                        Amount: 0,
                        Before: [],
                        During: [],
                        Process: '0',
                        Status: '0',
                        Tax: 0,
                        Taxable: true,
                        description: 'For Sale or Rent signs',
                        Cate: 'VRM-Prefix',
                        Comments: '',
                        Item: 4,
                        Qty: 0,
                        UM: '',
                        PPU: 0,
                        Cost: 0,
                        SubCost: 0,
                        SubPPU: 0,
                        pano: "false",
                        description_cn: "",
                        measure: "",
                        completeness: "0"
                    },
                    {
                        After: [],
                        Amount: 0,
                        Before: [],
                        During: [],
                        Process: '0',
                        Status: '0',
                        Tax: 0,
                        Taxable: true,
                        description: 'Any Violation Posting',
                        Cate: 'VRM-Prefix',
                        Comments: '',
                        Item: 5,
                        Qty: 0,
                        UM: '',
                        PPU: 0,
                        Cost: 0,
                        SubCost: 0,
                        SubPPU: 0,
                        pano: "false",
                        description_cn: "",
                        measure: "",
                        completeness: "0"
                    },
                ]
            }),
            success: function (result) {
                console.log("yes")

            }.bind(this),
        });
        // }

    }

    protected inputFile(files: FileList) {
        // console.log(1);
        // let file = files[0];
        // let reader = new FileReader();
        // let data = [];
        // reader.onload = (event: any) => {
        //     let $ = Cheerio.load(event.target.result);
        //     let nodes = $("svg").children()[1].children;
        //     console.log(nodes);
        //     for (let i = 0; i < nodes.length; i++) {
        //         if (!nodes[i].data) {
        //             data.push({
        //                 path: nodes[i].attribs.d,
        //                 name: nodes[i].attribs.id ? nodes[i].attribs.id : "unknown"
        //             })
        //         }
        //     }
        //     console.log(data);
        // }
        // reader.readAsText(file);
        var f = files[0];

        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e: any) {
            var data = e.target.result;

            var workbook = XLSX.read(data, { type: 'binary' });
            var sheet = workbook.Sheets[workbook.SheetNames[0]];
            var res = XLSX.utils.sheet_to_json(sheet)
            this.setState({ taskData: res })
            // console.log(workbook)
        }.bind(this);
        reader.readAsBinaryString(f);

    }
    protected handleLocationMouseMove(event) {
        const tooltipStyle = {
            display: 'block',
            top: event.clientY + 10,
            left: event.clientX - 100
        };
        this.setState({ tooltipStyle: tooltipStyle });
    }

    protected handleLocationClick(event) {
        // this.setState({currMap:ColoradoJson})
        console.log(event.target.attributes)
    }

    protected handleLocationMouseOver(event) {
        // const pointedLocation = event.target.attributes.name.value;
        // console.log(event)
        // this.setState({ pointedLocation: pointedLocation });
    }



    protected addMarker = (e) => {
        var temp = this.state.Marker;
        temp.push({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        })
        // console.log(temp)
        this.setState({ Marker: temp })
    }

    protected deleteMarker(index: number) {

        var temp = this.state.Marker;
        temp.splice(index, 1);
        this.setState({ Marker: temp })
    }

    protected onSuggestSelect(place: any) {
        var temp = this.state.Marker
        temp.push({
            lat: place.location.lat,
            lng: place.location.lng
        })
        this.setState({ Marker: temp })
    }

    // protected uploadFile(file: FileList) {
    //     var f = file[0];

    //     var reader = new FileReader();
    //     var name = f.name;
    //     reader.onload = function (e: any) {
    //         var data = e.target.result;

    //         var workbook = XLSX.read(data, { type: 'binary' });
    //         var sheet = workbook.Sheets[workbook.SheetNames[0]];
    //         console.log(XLSX.utils.sheet_to_json(sheet));

    //         // console.log(workbook)
    //     };
    //     reader.readAsBinaryString(f);
    // }


}

export default PageGhotiDevelop;
