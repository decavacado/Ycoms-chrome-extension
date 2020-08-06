/* 
    Made b y Declan Amoako

    2020

*/


function Blu(id,methods={},vdom=false){
    this._id = id
    this._app = document.getElementById(id)
    this._methods = methods
    this._check = vdom

    //event hooks
    function hook_events(obj){
        for(let key = 0; key < obj._app.attributes.length; key++){
            try {
                let attri = obj._app.attributes[key].localName
                if(attri.startsWith("b-on:")){
                    let event = attri.substring(5)
                    obj._app.addEventListener(event, obj._methods[obj._app.attributes[key].nodeValue])
                }else {
                    //pass
                }
             }
             catch(err) {
                 console.log(err)
             }
        }
    };
    //methods
    if(Object.keys(this._methods).length === 0 || !this._app){
        if(this._check === true){
            console.log("%c [BLU]:Element confirmed for id [ " + this._id + " ]", "color: blue")
        }else if(!this._app) {
            console.log("%c [BLU]:Element not found for id [ "+this._id+" ]", "color: blue")
        }else {
            console.log("%c [BLU]:No event methods pool available for id [ "+this._id+" ]", "color: blue")
        }
    }else {
        hook_events(this)
    }
}

 console.log("%c [BLU]:Succesfully Loaded", "color: blue")




