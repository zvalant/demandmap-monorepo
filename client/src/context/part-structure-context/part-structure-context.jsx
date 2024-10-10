/*
Context Purpose:
This context will contain states and functions that pertain to the demand map generation and UI
interaction with the map. This will currently trigger a structure generation when the form is submitted
and the request count is incremented.  Majority of remaining states outside of structures are 
toggles for menus and part information.
*/

import { createContext,useState,useEffect } from "react";
import { GenerateSubmittedStructure } from "./helpers/generate-submitted-structure.mjs";
import { STRUCTUREOPTIONS } from "../../utils/misc.mjs";
import {httpGetPartStructure, httpAddPartStructure, httpGetAllPartStructures} from "../../utils/requests.mjs";

//default values to revert to if error occurs
const defaultStructure = {attributes:{}};
const defaultStructureOption = STRUCTUREOPTIONS.available;


export const PartStructureContext = createContext({
    //use effect dependency for part strucutre setup
    reqCount:null, 
    setReqCount:()=>{},

    // use effect dependency for part structure options
    submittedStructureCount: null,
    setSubmittedStructureCount: ()=>{},
    partStructureOptions: null,
    setPartStructureOptions: ()=>{},
    submittedStructureOption: null,
    setSubmittedStructureOption: ()=>{},



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
//when user selects node or item to traverse in tree add 
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

    //use effect dependency for structure creation
    const [reqCount, setReqCount] = useState(0);

    //use effect adding structure states
    const [submittedStructureCount, setSubmittedStructureCount] = useState(0);
    const [submittedStructureOption, setSubmittedStructureOption] = useState("");
    const [partStructureOptions, setPartStructureOptions] = useState([]);

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
                    currentMasterStructure = await httpGetPartStructure(submittedPartStructure);
                    console.log(currentMasterStructure);
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

    useEffect(()=>{
        const fetchNewStructureOptions = async()=>{
            if (submittedStructureCount==0){
                return;
            }
            try{
                const response = await httpAddPartStructure(submittedStructureOption);
                console.log(response.ok);
                if(!response.ok){
                    throw new Error("Structure not Added, bad request");
                }else{
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setPartStructureOptions(await httpGetAllPartStructures())
                    alert(`Structure ${submittedStructureOption} was added`)
    
                }
            }catch{
                alert("Cant Add Structure. Please enter Valid Structure")
            }
            
        }
        fetchNewStructureOptions();

    }, [submittedStructureCount])
    useEffect(()=>{
        const fetchInitialStructureOptions = async ()=>{
            try{
                const response = await httpGetAllPartStructures();
                if (response == {"ERROR": "No Structures Found"}){
                    throw new Error("Error: Can't find Structures");
                }
                setPartStructureOptions(response);

            }catch{
                alert("Could not connect to DB no Options Available");
            }
        }
        fetchInitialStructureOptions();
        

    }, [])

    const value = {qty,setQty,currentPartStructure,
        setCurrentPartStructure,partStructures,setPartStructures,addToStructures,resetThePartStructures,changeToStructure,
        isLoading,setIsLoading,reqCount,setReqCount,changeActiveSetting,activeStructureType,setActiveStructureType, 
        setSubmittedQty, setSubmittedPartStructure, setSubmittedStructureType, submittedStructureCount, setSubmittedStructureCount,
    partStructureOptions, submittedStructureOption, setSubmittedStructureOption }
    return <PartStructureContext.Provider value = {value}>{children}</PartStructureContext.Provider>

}