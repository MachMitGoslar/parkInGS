import { inject, Injectable } from '@angular/core';
import { collection, collectionChanges, collectionSnapshots, docSnapshots, DocumentReference, Firestore, getDocs, query } from '@angular/fire/firestore';
import { map, Observable, ReplaySubject, Subject } from 'rxjs';
import { ParkingArea } from './parkingArea';
import { addDoc, deleteDoc, doc, FieldValue, GeoPoint, getDoc, increment, onSnapshot, serverTimestamp, setDoc, updateDoc } from '@firebase/firestore';
import L, { LatLng } from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class ParkingAreaService {
    private firestore = inject(Firestore)

      //private firestore: Firestore;
      public areas = new ReplaySubject<ParkingArea[]>(1)
      private local_areas: ParkingArea[] = [];

  constructor() {


    collectionSnapshots(query(collection(this.firestore,'parkingArea'))).subscribe(snapshot => {
      this.local_areas = snapshot.map(data => {
        return ParkingArea.fromData(data)
      })
      this.areas.next(this.local_areas);
    });
  }

    saveAreaToDB(area: ParkingArea): Promise<ParkingArea> {
      let promise = new Promise<ParkingArea>((resolve, reject) => {  
        if(area.ref) {
          setDoc(area.ref, {
              name: area.name,
              street: area.readable_street,
              plz: area.readable_plz,
              city: area.readable_city,
              capacity: area.capacity,
              borderPoints: area.borderPoints,
              occupied: area.occupied,
              updatedAt: serverTimestamp()
          }).then(
            () => {resolve(area)},
            error => {reject(error)}
          )
        } else {
            addDoc(collection(this.firestore, 'parkingArea'), {
                name: area.name,
                street: area.readable_street,
                plz: area.readable_plz,
                city: area.readable_city,
                capacity: area.capacity,
                borderPoints: area.borderPoints,
                occupied: area.occupied,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }).then(
                ref => {
                  area.ref = ref;
                  resolve(area);
                }, error => {reject(error)}
            )
        }
      })
      return promise
    }

    getAreaByRef(ref: DocumentReference): Subject<ParkingArea> {
      let area_obs = new Subject<ParkingArea>();
      docSnapshots(ref).subscribe(snapshot => {
        if(!snapshot.exists) {
          area_obs.error("Datensatz existiert nicht")
        }
        let data = snapshot;
        console.log(data);
        let area = ParkingArea.fromData(data);
        area_obs.next(area);
      
      })
      return area_obs;
    }

    delete(ref: DocumentReference|undefined): Promise<void> {
      let promise = new Promise<void>((resolve, reject) => {
        if(ref){
          deleteDoc(ref).then(() => {
            resolve()

          }, error => {
            reject(error)
          })
          
        } else {
          reject("Kein Ref")
        }
      })
      return promise
    }

    increaseCars(ref: DocumentReference, value: number): void {
      updateDoc(ref, {
        "occupied": increment(value)
      }).then(() => console.log("Increased"), error => console.warn(error))
    }

    decreaseCars(ref: DocumentReference, value: number): void {
      updateDoc(ref, {
        "occupied": increment(-value)
      }).then(() => console.log("Increased"), error => console.warn(error))
    }

    setAmount(area: ParkingArea, factor: number): void {
      updateDoc(area.ref!, {
        "occupied": Math.floor(area.capacity * factor)
      }).then(() => console.log("Setting amount to " + factor*100))
    }

    sortByLocation(position: GeoPoint): Observable<ParkingArea[]> {
      return this.areas.pipe(map(areas => {
        return areas.sort((a,b) => {
          let a_point = this.make_a_point(a.borderPoints[0])
          let b_point = this.make_a_point(b.borderPoints[0])
          let reference_point = this.make_a_point(position)

          a.distance_from_you = a_point.distanceTo(reference_point)
          b.distance_from_you = b_point.distanceTo(reference_point)
          
          if( a.distance_from_you < b.distance_from_you ) {
            
            return -1
          } else {
            return 1
          }
        })
      })) 
    }

    private make_a_point(geo_point: GeoPoint): L.LatLng {
      if(geo_point) {
        return new L.LatLng(geo_point.latitude, geo_point.longitude);
      } else {
        return new L.LatLng(0,0)
      }
      

    }

    public getRefFromString(str: String): DocumentReference {
      return doc(this.firestore, "parkingArea/"+str)
    }
}
