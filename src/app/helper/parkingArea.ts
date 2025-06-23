import { DocumentReference, GeoPoint, Timestamp, addDoc, collection, documentId, getDoc, setDoc } from "@firebase/firestore";



export class ParkingArea {

    public name = "";
    public readable_street = "";
    public readable_plz = "";
    public readable_city = "";
    public capacity = 0;
    public borderPoints: GeoPoint[] = [];
    public ref: DocumentReference | undefined;
    public occupied = 0;
    public updatedAt?: Date
    public createdAt?: Date
    public distance_from_you?: number;

    constructor() {
    }

    

    static async fromDB(ref: DocumentReference): Promise<ParkingArea> {
        let area = new ParkingArea();
        return await getDoc(ref).then(data => {
            if(!data.exists) { throw("No Data")}
            let doc_data = data.data();
            area.ref = ref;
            if(!doc_data) throw("No Data");
            area.borderPoints = doc_data['borderPoints'] ?? [];
            area.capacity = doc_data["capacity"] ?? 0;
            area.occupied = doc_data["occupied"] ?? 0;
            area.name = doc_data["name"] ?? "";
            area.readable_street = doc_data["street"] ?? "";
            area.readable_plz = doc_data["plz"] ?? "";
            area.readable_city = doc_data["city"] ?? "";
            return area
        }, error => {
            throw error;
        });
        
    }

    static fromData(data: any): ParkingArea {
        let area = new ParkingArea();
        let doc_data = data;
        if(!doc_data) throw("No Data");
        let document_data = doc_data.data();
        area.borderPoints = document_data['borderPoints'] ?? [];
        area.capacity = document_data["capacity"] ?? 0;
        area.occupied = document_data["occupied"] ?? 0;
        area.name = document_data["name"] ?? "";
        area.readable_street = document_data["street"] ?? "";
        area.readable_plz = document_data["plz"] ?? "";
        area.readable_city = document_data["city"] ?? "";
        area.updatedAt = document_data["updatedAt"]?.toDate()
        area.createdAt = document_data["createdAt"]?.toDate()
        area.ref = data.ref;
        return area
    }
}