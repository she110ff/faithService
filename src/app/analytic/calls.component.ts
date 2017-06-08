import { Component } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import * as moment from 'moment/moment';

@Component({
    selector: 'app-root',
    templateUrl: './calls.component.html'
})
export class CallsComponent {
    title = 'Faith Service!';  
    calls;
    callsRef;

    phoneNo;
    locationName;
    locations;

  timeSlots: any[];
  timeSlotsOption: IMultiSelectOption[];
  timeSlotsSetting: IMultiSelectSettings = {
    selectionLimit: 1,
    autoUnselect: true,
  };

  callTypes: any[];
  callTypesOption: IMultiSelectOption[];
  callTypesSetting: IMultiSelectSettings = {
    selectionLimit: 1,
    autoUnselect: true,
  };


    callDate: Date = new Date();
   public inputCallDate: string = '';

  public daterange: any = {};
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,

  };
  public singleOptions: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    singleDatePicker: true,
  };

    public mask = [/[0]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public arrayOfStrings = ['영등포', 'is', 'list', 'of', 'string', 'element'];

    valueChanged(newVal) {
      console.log("Case 2: value is changed to ", newVal);
    }


  constructor(public db: AngularFireDatabase) {
    this.callsRef = db.list('/calls', {
        query: {
          orderByChild: 'created'
        }
      })

      this.callsRef.subscribe(calls => {
        this.calls = calls.reverse();
      })



    this.getEach();
  }

  getEach(){

    let lcts = this.db.list('/code/locationName').subscribe( locations => {
      let newLocation = [];
      locations.map( lct => {
        newLocation.push( lct.$key );
      })
      this.locations = newLocation;
      console.log('this.locations :', this.locations);
      console.log('newLocation :', newLocation);
    });

      this.db.list('/code/timeSlot').subscribe( timeSlots => { 
         timeSlots.map(function(timeSlots){
           timeSlots.id = timeSlots.$key;
           timeSlots.name = timeSlots.$key;
         })
         console.log('timeSlots:', timeSlots);
         this.timeSlots = [ timeSlots[0].$key ];
         this.timeSlotsOption = timeSlots;
      });    

      this.db.list('/code/callType').subscribe( callTypes => { 
         callTypes.map(function(callTypes){
           callTypes.id = callTypes.$key;
           callTypes.name = callTypes.$key;
         })
         console.log('callTypes:', callTypes);
         this.callTypes = [ callTypes[0].$key ];
         this.callTypesOption = callTypes;
      });    

    let startAt = moment(this.callDate).format('YYYY-MM-DD');
        this.inputCallDate = startAt;
  }

  onChange(evt){

  }

  addCall(){
    let call = {
              phoneNo: this.phoneNo
            , locationName: this.locationName
            , timeSlot:this.setData(this.timeSlots)
            , callType:this.setData(this.callTypes)
            , date:new Date().getTime() 
            , created:new Date().getTime() 
          };
    console.log(" call:", call);
    if( this.phoneNo === undefined || this.locationName === undefined ){
      alert('전화번호와 지역은 반드시 입력해 주세요!');
      return;
    }

/*    if(this.rocket){
      this.rocketRef.update(rocket)
      .then(rocket => this.router.navigate(['/admin/rocket/']))
      .catch(error => console.log("failed for adding rocket"));
    }
    else{
      this.calls.push(rocket)
      .then(rocket => this.router.navigate(['/admin/rocket/']))
      .catch(error => console.log("failed for adding rocket"));

    }*/


    let calls = this.db.list('/calls');
    calls.push(call);


    if(this.locations.indexOf(this.locationName) == -1){
      //alert('save location');
      let val = {}
      val[this.locationName] = true;
      this.db.object('/code/locationName').update(val);
    }
  }


  cancel(){

  }

  modifyCall(key){
    console.log('key :', key);
  }

  setData(arrData){
    console.log(arrData);
    return arrData[0];
  }


   toArray(obj){
    let arr = [];
    for( var key in obj ){ arr.push( key ); }
    return arr;
  }



  toValue(obj){
    console.log('obj :', obj);
    let arr = this.toArray(obj);
    return arr.join(", ");
  }

  public showRange(evt:any, sort: string){
    console.log('showRange:', evt, sort);

      let startAt;
      let endAt;
      
     if(sort === 'callDate'){
        startAt = moment(this.callDate).format('YYYY-MM-DD');
        endAt = moment(this.callDate).format('YYYY-MM-DD');
      }
    
      evt.picker.setStartDate(startAt);
      evt.picker.setEndDate(endAt);

      evt.picker.updateCalendars();
      evt.picker.updateElement();
      evt.picker.updateView();
      evt.picker.updateFormInputs();

  }

}
