import { Component, OnInit  } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TravelService} from '../services/travel.service'


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  public origin: any;
  public departureDate :any ;
  public returnDate :any ;
  public badget :any ;
  public cities: any[];
  public places: any[] = [];

   formatter = (x: {name: string,code:string }) => "("+x.code+") "+ x.name;

   search = (text$: Observable<string>) =>
        text$
       .debounceTime(200)
       .distinctUntilChanged()
       .map(term => term === '' ? []
         : this.cities.filter(v => new RegExp(term, 'gi').test(v.name+" "+v.code+" "+v.countryName)    ));

  constructor(private travelService:TravelService) { }

  ngOnInit() {
       // init cities from REST API
       this.travelService.getCities().subscribe( (data) =>

        {
      //  console.log("Data from subscribe "+data.info );
        this.cities =JSON.parse( data.info).Cities ;
        }

      ) ;

  }

  getPlaces(){
    let seachObject = {origin:this.origin.code,departuredate:this.formatDate(this.departureDate),returndate:this.formatDate(this.returnDate),maxfare:this.badget}
    this.travelService.getFlights(seachObject).subscribe( (data) =>

     {
     //console.log("Data from getFlights subscribe "+JSON.stringify(data.info) );
      ///this.cities =JSON.parse( data.info).Cities ;
      this.places = JSON.parse(data.info).FareInfo ;
      console.log(JSON.parse(data.info).FareInfo);
     }

   ) ;
  }
  formatDate(date){
    return [date.year, date.month, date.day].join('-');
  }
  getDestinationName(code){
    console.log(code);
    return this.cities.find(city => { console.log(city.code+" : "+code+" name "+city.name) ;if(city.code === code) return city.name});
  }



}
