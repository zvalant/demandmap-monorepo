import { createContext,useState,useEffect } from "react";
import { MasterStructure } from "./helpers/master-structure.mjs";
import { AvailableStructure } from "./helpers/available-structure.mjs";
import { GenerateSubmittedStructure } from "./helpers/generate-submitted-strructure.mjs";
import { OnHandStructure } from "./helpers/onhand-structure.mjs";
import { STRUCTURETYPESTITLES } from "../../utils/misc.mjs";
import { testPart } from "../../data/test-data.mjs";
/*
Context Purpose:
This context will contain states and functions that pertain to the demand map generation and UI
interaction with the map. This will currently trigger a structure generation when the form is submitted
and the request count is incremented.  Majority of remaining states outside of structures are 
toggles for menus and part information.
*/
const defaultStructure = {attributes:{}};
const defaultStructureOption = STRUCTURETYPESTITLES.available;


export const PartStructureContext = createContext({
    //use effect dependency
    reqCount:null, 
    setReqCount:()=>{},


    //from ui submission
    submittedQty: null,
    setSubmittedQty: ()=>{},
    submittedPartStructure: undefined,
    setSubmittedPartStructure: ()=>{},
    SubmittedStructureType: "",
    setSubmittedStructureType: ()=>{},

    //current setup
    activePartStructure: undefined,
    setActivePartStructure:()=>{},
    activeStructureQty: null,
    setActiveStructure: ()=>{},
    activeStructureType: "",
    setActiveStructureType: ()=>{},

    //undecided 
    partNumber: null,
    setPartNumber: ()=>null,
    qty: null,
    setQty: ()=>null,



    //computed strucutres from activeMasterStructure
    onHandStructure:{},
    setOnHandStructure:()=>{},
    availableStructure:{},
    setAvailableStructure:()=>{},


    //determine current map 
    currentPartStructure: undefined,
    setCurrentPartStructure: ()=>{},
    partStructures: [],
    setPartStructures: ()=>{},

    
});

export const addPartStructure = (partStructures,locationArray)=>{
    const partStructuresPast = [...partStructures];
    const startIdx = 0;
    let currentStructure = partStructuresPast[startIdx];
    for (let i=0;i<locationArray.length;i++){
        console.log(locationArray[i]);
        currentStructure = currentStructure.children[locationArray[i]];
        
    }
    return [...partStructuresPast,currentStructure];

}

export const StructureIndexChange = (partStructures,index)=>{
    let counter = 0;
    const newStructures = partStructures.filter(()=>{
        counter++;
        return counter<index;

    })
    return newStructures;
}

export const resetPartStructures = ()=>{

    return []
}

export const PartStructureProvider = ({children}) =>{

    //loading flag
    const [isLoading,setIsLoading] = useState(false);

    //use effect dependency
    const [reqCount, setReqCount] = useState(0);

    //from ui submission
    const [submittedQty, setSubmittedQty] = useState(0);
    const [submittedPartStructure, setSubmittedPartStructure] = useState(undefined);
    const [submittedStructureType, setSubmittedStructureType] = useState("")

    //current setup
    const [activeMasterStructure, setActiveMasterStructure] = useState({});
    const [activeStructureQty, setActiveStructureQty] = useState(null);
    const [activeStructureType, setActiveStructureType] = useState(defaultStructureOption);

    //undecided
    const [qty,setQty] = useState(null);

    //determine current map
    const [partStructures,setPartStructures] = useState([]);
    const [currentPartStructure,setCurrentPartStructure] = useState(undefined);



    const addToStructures = (locationArray)=>{
        setPartStructures(addPartStructure(partStructures,locationArray))
    }

    const changeToStructure = (index) =>{
        setPartStructures(StructureIndexChange(partStructures,index))
    }

    const resetThePartStructures = ()=>{
        setPartStructures(resetPartStructures())
    }

    const changeActiveSetting = (setting)=>{
        setActiveStructureType(setting);
    }


    useEffect(()=>{
        setIsLoading(true);
        

        const generateSetup = async ()=>{
            //async function to start loading wheel and build structure, append 1st value to partStructures and set currentStructure the end of array
            if (reqCount===0){//return without running since no search requests have been made.
                setIsLoading(false);
                return;
            }
            try{
                let currentMasterStructure = {};
                if (submittedPartStructure!== activeMasterStructure.name){
                    // !NEED TO CHANGE! pull part structure from database currently just test array
                    let testData = testPart;
                    for (let i=0;i<testData.length;i++){
                        if (testData[i].name == submittedPartStructure){
                            currentMasterStructure = testData[i];
                        }
                    }
                }else{
                    currentMasterStructure = activeMasterStructure;
                }
                let selectedStructure = GenerateSubmittedStructure(currentMasterStructure, submittedQty, submittedStructureType);
                console.log(selectedStructure)

                //set all states
                setActiveMasterStructure(currentMasterStructure);
                setActiveStructureQty(submittedQty);
                setActiveStructureType(submittedStructureType);
                setPartStructures([selectedStructure])
                setCurrentPartStructure(selectedStructure);
                

            }catch (err){
                console.log("error generating map:", err);
                setPartStructures([]);
                setCurrentPartStructure(defaultStructure);
                if (reqCount!== 0){alert("Could not Generate Map");
                    console.log("error of map")
            }
            }finally{
                setIsLoading(false);
            }
            
        }
        generateSetup();

    },[reqCount])
    useEffect(()=>{
        let currentStructure = {}
        const finalIdx = partStructures.length-1;
        if (finalIdx>=0){
            currentStructure = partStructures[finalIdx];
        }else{
            currentStructure = undefined;
        }
        setCurrentPartStructure(currentStructure);
        console.log("partStructures: ",partStructures)
    },[partStructures])



    const value = {qty,setQty,currentPartStructure,
        setCurrentPartStructure,partStructures,setPartStructures,addToStructures,resetThePartStructures,changeToStructure,
        isLoading,setIsLoading,reqCount,setReqCount,changeActiveSetting,activeStructureType,setActiveStructureType, setSubmittedQty, setSubmittedPartStructure, setSubmittedStructureType}
    return <PartStructureContext.Provider value = {value}>{children}</PartStructureContext.Provider>

}