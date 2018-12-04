const theurl = "https://brgraphql.herokuapp.com/";

clientside = function() {
    var arg1 = 
    `{
        records(arg1:"${theQuery.value}") {
            facility_name
            gender
            age_group
            total_charges
            ccs_diagnosis_description
            ccs_procedure_description
            health_service_area
            total_costs
            length_of_stay
            zip_code_3_digits
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