const theurl = "https://brgraphql.herokuapp.com/";

clientside = function() {
    var arg1 = 
    `{
        records(arg1:"facility_name=University Hospital&$limit=10") {
            facility_name
            gender
            total_charges
            ccs_diagnosis_description
            health_service_area
            total_costs
          }
    }`


data = JSON.stringify({query:arg1})

fetch(theurl,
    {
      method:'POST',
      body:data,
      headers:{
        "Content-Type": "application/json",
        //"Accept": "application/json",
        //"cache-control": "no-cache"
      }
    }
)
.then(response => response.json())
.then(json => {
    var div=document.getElementById('thedata')
    div.innerHTML = ''
    var pre=document.createElement('pre')
    div.appendChild(pre)
    pre.innerHTML = JSON.stringify(json,null,3)
})

}

clientside()